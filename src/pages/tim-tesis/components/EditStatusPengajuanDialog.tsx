import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

interface EditStatusPengajuanDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nim: string;
}

export default function EditStatusPengajuanDialog({
  open,
  setOpen,
  nim,
}: EditStatusPengajuanDialogProps): JSX.Element {
  const [status, setStatus] = useState<StatusPendaftaranEnum>();

  // TODO: Fetch pengajuan data from API
  useEffect(() => {
    // Fetch pengajuan data
    setStatus(StatusPendaftaranEnum.ACCEPTED);
  }, [setStatus, nim]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Status Pengajuan</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-sm text-slate-500">
            Anda akan mengubah status pengajuan mahasiswa ini. Pastikan status
            yang dipilih sudah sesuai.
          </p>
        </DialogDescription>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 font-normal text-gray-600">
              <p className="font-medium text-slate-600">
                {status || "Pilih status"}
              </p>
              <VscChevronDown className="text-gray-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value) =>
                setStatus(value as StatusPendaftaranEnum)
              }
            >
              <DropdownMenuRadioItem value={StatusPendaftaranEnum.ACCEPTED}>
                {StatusPendaftaranEnum.ACCEPTED}
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value={StatusPendaftaranEnum.REJECTED}>
                {StatusPendaftaranEnum.REJECTED}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex w-full items-center justify-end">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
          >
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
