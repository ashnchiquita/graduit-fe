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
  const [wawancara, setWawancara] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { refreshData } = useData();

  useEffect(() => {
    if (initialWawancara) {
      setWawancara(initialWawancara);
    }
  }, [initialWawancara, open]);

  useEffect(() => {
    if (!wawancara) {
      return;
    }

    if (wawancara instanceof Date && !isNaN(wawancara.getTime())) {
      if (
        wawancara.getTime() <
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
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
    setOpen(false);
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
            value={
              wawancara ? new Date(wawancara).toISOString().slice(0, 16) : ""
            }
            onChange={(e) => setWawancara(new Date(e.target.value))}
          />
          {wawancara && disabled && (
            <p className="text-sm font-medium text-red-500">
              Jadwal wawancara minimal 2 hari setelah hari ini.
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-end">
          <Button
            onClick={handleSave}
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
