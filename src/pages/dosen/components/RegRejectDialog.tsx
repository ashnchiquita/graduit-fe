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

type RegRejectDialogProps = {
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  onReject: () => void;
  dialogTrigger: JSX.Element;
};

export default function RegRejectDialog({
  rejectDialogOpen,
  setRejectDialogOpen,
  name,
  onReject,
  dialogTrigger,
}: RegRejectDialogProps): JSX.Element {
  return (
    <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">
            Yakin untuk menolak pengajuan {name}?
          </DialogTitle>
          <DialogDescription className="text-left">
            Aksi ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>

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
            className="bg-red-500 px-4 text-gray-100 hover:bg-red-600"
            type="submit"
            onClick={onReject}
          >
            Tolak
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
