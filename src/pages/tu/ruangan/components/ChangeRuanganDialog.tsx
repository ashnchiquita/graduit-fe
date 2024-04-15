import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GoPencil } from "react-icons/go";

interface ChangeRuanganDialogProps {
  name: string;
  handleSubmit: (ruangan: string) => void;
  handleSendMail: () => void;
}

const ChangeRuanganDialog = ({
  name,
  handleSubmit,
  handleSendMail,
}: ChangeRuanganDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [newRuangan, setNewRuangan] = useState("");

  const handleInputClose = () => {
    setOpen(false);
  };

  const handleConfirmationClose = () => {
    setConfirmation(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button
          onClick={() => setOpen(true)}
          className="flex flex-row items-center gap-2 rounded-lg border-[0.5px] border-gray-300 px-3 py-1 hover:bg-gray-200"
        >
          <GoPencil size={14} />
          Ubah
        </button>
      </DialogTrigger>

      {/* DIALOG PERTAMA */}
      {open && (
        <>
          <DialogContent>
            <DialogClose onClick={handleInputClose} />
            <DialogHeader className=" items-start">
              <DialogTitle>Ruangan Sidang</DialogTitle>
              <DialogDescription>Ubah ruangan untuk sidang.</DialogDescription>
            </DialogHeader>
            {/* INPUT */}
            <Input
              placeholder="Masukkan ruangan..."
              className="my-5"
              value={newRuangan}
              onChange={(val) => {
                setNewRuangan(val.target.value);
              }}
            />
            <DialogFooter className="items-end">
              <Button
                className="bg-blue-600"
                onClick={() => {
                  setOpen(false);
                  setConfirmation(true);
                }}
              >
                Ubah
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogOverlay />
        </>
      )}

      {/* DIALOG KEDUA */}
      {confirmation && (
        <>
          <DialogContent>
            <DialogClose onClick={handleConfirmationClose} />
            <DialogHeader className=" items-start">
              <DialogTitle>
                Yakin untuk mengubah ruangan sidang {name}?
              </DialogTitle>
              <DialogDescription className=" text-left">
                Ketika Anda mengubah ruangan, mahasiswa akan mendapatkan
                notifikasi via email.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row items-center justify-end gap-2">
              <Button
                variant={"ghost"}
                className="border-[0.5px]"
                onClick={() => {
                  setConfirmation(false);
                  setOpen(true);
                }}
              >
                Kembali
              </Button>
              <Button
                className="bg-blue-600"
                onClick={() => {
                  setConfirmation(false);
                  handleSubmit(newRuangan);
                  handleSendMail();
                }}
              >
                Ubah
              </Button>
            </DialogFooter>
          </DialogContent>
          <DialogOverlay />
        </>
      )}
    </Dialog>
  );
};

export default ChangeRuanganDialog;
