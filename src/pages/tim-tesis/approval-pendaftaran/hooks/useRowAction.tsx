import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../../context/DataContext";
import {
  approvePendaftaran,
  approvePendaftaranS1,
  rejectPendaftaran,
  rejectPendaftaranS1,
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
  const { data } = useSession();
  const { refreshData } = useData();

  const { trigger: acceptTrigger, error: acceptError } = useSWRMutation(
    `/registrasi-tesis/${idMahasiswa}/status`,
    async (_, { arg }: { arg: { id: string } }) => {
      if (!data) {
        return null;
      }

      if (data.roles.includes(RoleEnum.S1_TIM_TA)) {
        try {
          const res = await approvePendaftaranS1(arg.id);
          toast.error("Berhasil menerima pendaftaran");
          return res.data;
        } catch (error) {
          toast.error("Gagal menerima pendaftaran");
        }
      } else if (data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
        try {
          const res = await approvePendaftaran(idMahasiswa);
          toast.error("Berhasil menerima pendaftaran");
          return res.data;
        } catch (error) {
          toast.error("Gagal menerima pendaftaran");
        }
      } else {
        return null;
      }
    },
  );

  const { trigger: rejectTrigger, error: rejectError } = useSWRMutation(
    `/registrasi-tesis/${idMahasiswa}/status`,
    async (_, { arg }: { arg: { id: string } }) => {
      if (!data) {
        return null;
      }

      if (data.roles.includes(RoleEnum.S1_TIM_TA)) {
        try {
          const res = await rejectPendaftaranS1(arg.id);
          toast.success("Berhasil menolak pendaftaran");
          return res.data;
        } catch (error) {
          toast.error("Gagal menolak pendaftaran");
        }
      } else if (data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
        try {
          const res = await rejectPendaftaran(idMahasiswa);
          toast.success("Berhasil menolak pendaftaran");
          return res.data;
        } catch (error) {
          toast.error("Gagal menolak pendaftaran");
        }
      } else {
        return null;
      }
    },
  );

  const handleAccept = async (id: string) => {
    try {
      await acceptTrigger({
        id: id,
      });
      refreshData();
      setAcceptDialogOpen(false);
    } catch (error) {
      toast.error(acceptError);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectTrigger({
        id: id,
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
