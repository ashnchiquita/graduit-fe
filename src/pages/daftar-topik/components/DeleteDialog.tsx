import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import useDeleteDialog from "../hooks/useDeleteDialog";
import { DaftarTopikData } from "../types";

type DeleteDialogProps = {
  row: Row<DaftarTopikData>;
  updateData: () => Promise<any>;
  closeDialog: () => void;
  strata?: "S1" | "S2";
};

export default function DeleteDialog({
  row,
  updateData,
  closeDialog,
  strata,
}: DeleteDialogProps) {
  const { handleDelete } = useDeleteDialog(updateData, closeDialog, strata);

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
        <Button
          className="bg-red-500 px-4 text-gray-100 hover:bg-red-600"
          type="submit"
          onClick={() => handleDelete(row.original.id)}
        >
          Hapus
        </Button>
      </div>
    </DialogContent>
  );
}
