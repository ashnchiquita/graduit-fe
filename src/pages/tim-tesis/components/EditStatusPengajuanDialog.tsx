import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleEnum } from "@/types/session-data";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../context/DataContext";
import {
  approvePendaftaran,
  getSelfData,
  rejectPendaftaran,
  updateStatusS1,
} from "../rekap-pendaftaran/clients";

interface EditStatusPengajuanDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  pendaftaranId: string;
  initialStatus: StatusPendaftaranEnum;
}

export default function EditStatusPengajuanDialog({
  open,
  setOpen,
  id,
  pendaftaranId,
  initialStatus,
}: EditStatusPengajuanDialogProps): JSX.Element {
  const [status, setStatus] = useState<StatusPendaftaranEnum>();
  const [isChanged, setIsChanged] = useState(false);

  const { refreshData } = useData();

  useEffect(() => {
    if (status !== initialStatus) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [status, initialStatus]);

  useEffect(() => {
    if (!open) {
      setStatus(initialStatus);
    }
  }, [open, initialStatus]);

  const { trigger: acceptTrigger, error: acceptError } = useSWRMutation(
    `/registrasi-tesis/${id}/status`,
    async (_, { arg }: { arg: { id: string; pendaftaranId: string } }) => {
      try {
        const self = await getSelfData();
        if (self.data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
          const res = await approvePendaftaran(arg.id);
          return res.data;
        } else {
          const res = await updateStatusS1(arg.pendaftaranId, "APPROVED");
          return res.data;
        }
      } catch (error) {
        toast.error("Gagal menerima pendaftaran");
      }
    },
  );

  const { trigger: rejectTrigger, error: rejectError } = useSWRMutation(
    `/registrasi-tesis/${id}/status`,
    async (_, { arg }: { arg: { id: string; pendaftaranId: string } }) => {
      try {
        const self = await getSelfData();
        if (self.data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
          const res = await rejectPendaftaran(arg.id);
          return res.data;
        } else {
          const res = await updateStatusS1(arg.pendaftaranId, "REJECTED");
          return res.data;
        }
      } catch (error) {
        toast.error("Gagal menolak pendaftaran");
      }
    },
  );

  const handleAccept = async (id: string) => {
    try {
      await acceptTrigger({
        id: id,
        pendaftaranId: pendaftaranId,
      });
      refreshData();
    } catch (error) {
      toast.error(acceptError);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectTrigger({
        id: id,
        pendaftaranId: pendaftaranId,
      });
      refreshData();
    } catch (error) {
      toast.error(rejectError);
    }
  };

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
              if (status === StatusPendaftaranEnum.ACCEPTED) {
                handleAccept(id);
              } else {
                handleReject(id);
              }
              setOpen(false);
            }}
            className="bg-blue-500 text-gray-100 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-primary-foreground"
            disabled={!isChanged}
          >
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
