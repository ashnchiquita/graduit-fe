import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

type ArchiveDialogProps = {
  archiveDialogOpen: boolean;
  setArchiveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  onArchive: () => void;
  dialogTrigger: JSX.Element;
};

export default function ArchiveDialog({
  archiveDialogOpen,
  setArchiveDialogOpen,
  name,
  onArchive,
  dialogTrigger,
}: ArchiveDialogProps): JSX.Element {
  const [stage, setStage] = useState<0 | 1>(0);

  return (
    <Dialog
      open={archiveDialogOpen}
      onOpenChange={(val: boolean) => {
        val ? setStage(0) : setTimeout(() => setStage(0), 100);
        setArchiveDialogOpen(val);
      }}
    >
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">
            {stage === 0
              ? "Arsipkan Data"
              : `Yakin untuk mengarsipkan data ${name}?`}
          </DialogTitle>
          {stage === 1 && (
            <DialogDescription className="text-left">
              Aksi ini tidak bisa dibatalkan.
            </DialogDescription>
          )}
        </DialogHeader>

        {stage === 0 ? (
          <div className="flex w-full max-w-[282px] flex-col gap-4 md:max-w-[377px]">
            <hr />

            <div className="-my-2 flex-col items-center text-center">
              <h2 className="text-base text-muted-foreground">Mahasiswa</h2>
              <p className="text-lg font-medium text-foreground">{name}</p>
            </div>

            <hr />

            <div className="flex items-center gap-6 rounded-md border border-yellow-500 bg-yellow-100/60 px-5 py-2.5">
              <IoWarningOutline className="size-10 shrink-0 text-yellow-600" />
              <p className="text-xs text-slate-800 md:text-sm">
                Semua data mahasiswa akan menjadi kosong. Pastikan mahasiswa{" "}
                <span className="font-bold">
                  telah menyelesaikan semua kegiatan akademis
                </span>{" "}
                untuk mengarsipkan data.
              </p>
            </div>

            <hr />

            <Button
              className="w-full rounded-lg border border-slate-400 bg-slate-50 py-2 text-xs text-slate-700 hover:bg-slate-100 md:text-sm"
              onClick={() => setStage(1)}
            >
              <p>Saya telah memahami dan ingin melanjutkan</p>
            </Button>
          </div>
        ) : (
          <div className="mt-8 flex w-full justify-end gap-2">
            <DialogClose asChild>
              <Button
                className="gap-4 border-2 border-slate-200 bg-white text-primary hover:bg-slate-100"
                type="submit"
              >
                Kembali
              </Button>
            </DialogClose>
            <Button
              className="bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
              type="submit"
              onClick={onArchive}
            >
              Arsipkan
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
