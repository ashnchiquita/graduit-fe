import { RoleEnum } from "@/types/session-data";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../../context/DataContext";
import {
  approvePendaftaran,
  getSelfData,
  rejectPendaftaran,
  updateStatusS1,
} from "../clients";
import { RowActionHookRet } from "../types";

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
    try {
      await acceptTrigger({
        id: id,
        pendaftaranId: pendaftaranId,
      });
      refreshData();
      setAcceptDialogOpen(false);
    } catch (error) {
      toast.error(acceptError);
    }
  };

  const handleReject = async (id: string, pendaftaranId: string) => {
    try {
      await rejectTrigger({
        id: id,
        pendaftaranId: pendaftaranId,
      });
      refreshData();
      setRejectDialogOpen(false);
    } catch (error) {
      toast.error(rejectError);
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
