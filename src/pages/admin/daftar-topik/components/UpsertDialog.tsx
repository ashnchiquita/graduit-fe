import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { DaftarTopikData } from "../types";

type DeleteDialogProps = {
  row: Row<DaftarTopikData>;
  updateData: () => Promise<any>;
  closeDialog: () => void;
};

export default function UpsertDialog({ row }: DeleteDialogProps) {
  return (
    <DialogContent>
      <DialogHeader className="gap-2">
        <DialogTitle>Hapus Topik {row.original.judul}?</DialogTitle>
        <DialogDescription>
          Topik yang sudah dihapus tidak dapat dikembalikan dan seluruh data
          yang berkaitan akan dihapus.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-8 flex w-full justify-end gap-2">
        <DialogClose asChild>
          <Button
            className="gap-4 border-2 border-slate-200 bg-white text-primary hover:bg-slate-100"
            type="submit"
          >
            Batalkan
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
