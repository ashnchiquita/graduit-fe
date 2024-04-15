import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface EditWawaWancaraDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nim: string;
}

export default function EditWawancaraDialog({
  open,
  setOpen,
  nim,
}: EditWawaWancaraDialogProps): JSX.Element {
  const [wawancara, setWawancara] = useState<Date>();
  const [disabled, setDisabled] = useState<boolean>(true);

  // TOOD: Fetch wawancara data from API
  useEffect(() => {
    // Fetch wawancara data
    console.log(nim);
    setWawancara(new Date());
  }, [setWawancara, nim]);

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
