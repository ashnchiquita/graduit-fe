import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table } from "@tanstack/react-table";
import { KelasPengguna } from "../types";
import useUnassignKelasDialog from "../hooks/useUnassignKelasDialog";

type ComponentProps = {
  dialogTrigger: JSX.Element;
  title: string;
  penggunaIds: string[];
  type: "DOSEN" | "MAHASISWA";
  searchValue: string;
  table: Table<KelasPengguna>;
};

export default function UnassignKelasDialog({
  dialogTrigger,
  title,
  penggunaIds,
  type,
  searchValue,
  table,
}: ComponentProps): JSX.Element {
  const { dialogOpen, setDialogOpen, handleSubmit } = useUnassignKelasDialog(
    penggunaIds,
    type,
    searchValue,
    table,
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left capitalize">{title}</DialogTitle>
        </DialogHeader>

        <p className="text-sm">
          Anda akan{" "}
          <span className="font-bold uppercase text-destructive">
            Menghapus
          </span>{" "}
          seluruh kelas pada {penggunaIds.length} {type.toLowerCase()}
        </p>

        <div className="mt-8 flex w-full justify-end gap-2">
          <Button
            variant="destructive"
            // className="bg-red-500 text-gray-100 hover:bg-red-600"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
