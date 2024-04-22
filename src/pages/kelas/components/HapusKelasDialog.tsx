import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { deleteClass } from "../daftar-kelas/client";
import { useData } from "../context/DataContext";

interface HapusKelasDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  mataKuliahKode: string;
  nomor: string;
}

export default function HapusKelasDialog({
  dialogOpen,
  setDialogOpen,
  mataKuliahKode,
  nomor,
}: HapusKelasDialogProps): JSX.Element {
  const { refreshData } = useData();

  const nomorKelasNumber = parseInt(nomor.slice(1));

  const { trigger: deleteClassTrigger } = useSWRMutation("/kelas", async () => {
    try {
      await deleteClass(mataKuliahKode, nomorKelasNumber);
      toast.success(`Berhasil menghapus kelas ${nomor} ${mataKuliahKode}`);
    } catch (error) {
      toast.error(`Gagal menghapus kelas ${nomor} ${mataKuliahKode}`);
    }
  });

  const handleDelete = async () => {
    await deleteClassTrigger();
    refreshData();
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Hapus Kelas</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin untuk menghapus kelas {nomor}{" "}
            {mataKuliahKode}?{" "}
            <span className="font-medium text-red-500">
              Aksi ini tidak dapat dikembalikan.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full items-center justify-end">
          <Button
            className="rounded-lg border border-red-500 bg-transparent px-2 py-0.5 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => {
              handleDelete();
              setDialogOpen(false);
            }}
          >
            Hapus Kelas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
