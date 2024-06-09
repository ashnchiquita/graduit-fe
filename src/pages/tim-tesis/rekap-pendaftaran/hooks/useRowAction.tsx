import { useState } from "react";
import { RowActionHookRet } from "../types";
import {
  approvePendaftaran,
  getSelfData,
  rejectPendaftaran,
  updateStatusS1,
} from "../clients";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../../context/DataContext";
import { RoleEnum } from "@/types/session-data";

type RowActionHookParams = {
  idMahasiswa: string;
};

export default function useRowAction({
  idMahasiswa,
}: RowActionHookParams): RowActionHookRet {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const { refreshData } = useData();

  const { trigger: acceptTrigger, error: acceptError } = useSWRMutation(
    `/registrasi-tesis/${idMahasiswa}/status`,
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
    `/registrasi-tesis/${idMahasiswa}/status`,
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

  const handleAccept = async (id: string, pendaftaranId: string) => {
    await acceptTrigger({
      id: id,
      pendaftaranId: pendaftaranId,
    });

    if (acceptError) {
      toast.error(acceptError);
    } else {
      refreshData();
      setAcceptDialogOpen(false);
    }
  };

  const handleReject = async (id: string, pendaftaranId: string) => {
    await rejectTrigger({
      id: id,
      pendaftaranId: pendaftaranId,
    });

    if (rejectError) {
      toast.error(rejectError);
    } else {
      refreshData();
      setRejectDialogOpen(false);
    }
  };

  return {
    isPopoverOpen,
    setIsPopoverOpen,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    handleAccept,
    handleReject,
  };
}
