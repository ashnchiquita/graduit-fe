import { useState } from "react";
import { RowActionHookRet } from "../types";
import {
  approvePendaftaran,
  approvePendaftaranS1,
  rejectPendaftaran,
  rejectPendaftaranS1,
} from "../clients";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../../context/DataContext";
import useSession from "@/hooks/useSession";
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
          return res.data;
        } catch (error) {
          toast.error("Gagal menerima pendaftaran");
        }
      } else if (data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
        try {
          const res = await approvePendaftaran(arg.id);
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
          return res.data;
        } catch (error) {
          toast.error("Gagal menolak pendaftaran");
        }
      } else if (data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
        try {
          const res = await rejectPendaftaran(arg.id);
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
    await acceptTrigger({
      id: id,
    });

    if (acceptError) {
      toast.error(acceptError);
    } else {
      refreshData();
      setAcceptDialogOpen(false);
    }
  };

  const handleReject = async (id: string) => {
    await rejectTrigger({
      id: id,
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
