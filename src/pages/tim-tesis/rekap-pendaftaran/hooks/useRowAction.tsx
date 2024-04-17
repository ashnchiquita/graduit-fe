import { useState } from "react";
import { RowActionHookRet } from "../types";
import { approvePendaftaran, rejectPendaftaran } from "../clients";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useData } from "../context/DataContext";

type RowActionHookParams = {
  idMahasiswa: string;
};

export default function useRowAction({
  idMahasiswa,
}: RowActionHookParams): RowActionHookRet {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [editDosenPembimbingDialogOpen, setEditDosenPembimbingDialogOpen] =
    useState(false);

  const { refreshData } = useData();

  const { trigger: acceptTrigger, error: acceptError } = useSWRMutation(
    `/registrasi-tesis/${idMahasiswa}/status`,
    async (_, { arg }: { arg: { id: string } }) => {
      try {
        const res = await approvePendaftaran(arg.id);
        return res.data;
      } catch (error) {
        toast.error("Gagal menerima pendaftaran");
      }
    },
  );

  const { trigger: rejectTrigger, error: rejectError } = useSWRMutation(
    `/registrasi-tesis/${idMahasiswa}/status`,
    async (_, { arg }: { arg: { id: string } }) => {
      try {
        const res = await rejectPendaftaran(arg.id);
        return res.data;
      } catch (error) {
        toast.error("Gagal menolak pendaftaran");
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
    editDosenPembimbingDialogOpen,
    setEditDosenPembimbingDialogOpen,
    handleAccept,
    handleReject,
  };
}
