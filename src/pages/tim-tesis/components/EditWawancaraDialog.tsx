import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import useSWRMutation from "swr/mutation";
import { updateInterviewDate } from "../riwayat-pendaftaran/clients";
import { toast } from "react-toastify";

interface EditWawaWancaraDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  initialWawancara: Date | undefined;
}

export default function EditWawancaraDialog({
  open,
  setOpen,
  id,
  initialWawancara,
}: EditWawaWancaraDialogProps): JSX.Element {
  const [wawancara, setWawancara] = useState<Date>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const { refreshData } = useData();

  useEffect(() => {
    if (wawancara === initialWawancara) {
      setDisabled(true);
    }
  }, [wawancara, initialWawancara]);

  useEffect(() => {
    if (initialWawancara && !open) {
      setWawancara(initialWawancara);
    }
  }, [setWawancara, initialWawancara, open]);

  // Check if date is minimum 2 days after today
  useEffect(() => {
    if (wawancara) {
      if (
        wawancara.getTime() <
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [wawancara]);

  const { trigger: wawancaraTrigger } = useSWRMutation(
    `registrasi-tesis/${id}/interview`,
    async (_) => {
      try {
        const res = await updateInterviewDate(id, wawancara as Date);

        toast.success("Berhasil mengubah jadwal wawancara");
        return res.data;
      } catch (error) {
        toast.error("Gagal mengubah jadwal wawancara");
      }
    },
  );

  const handleSave = async () => {
    await wawancaraTrigger();
    refreshData();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Jadwal Wawancara</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-sm text-slate-500">
            Pastikan jadwal wawancara sudah disetujui oleh dosen pembimbing.
          </p>
        </DialogDescription>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Jadwal Wawancara
          </label>
          <input
            type="datetime-local"
            className="rounded-lg border border-gray-300 p-2"
            value={wawancara?.toISOString().slice(0, 16)}
            onChange={(e) => setWawancara(new Date(e.target.value))}
          />
          {/* Check if date is minimum 2 days after today */}
          {wawancara && disabled && (
            <p className="text-sm font-medium text-red-500">
              Jadwal wawancara minimal 2 hari setelah hari ini.
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-end">
          <Button
            onClick={() => {
              handleSave();
              setOpen(false);
            }}
            className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
            disabled={disabled}
          >
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
