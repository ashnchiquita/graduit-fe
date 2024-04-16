import { useState } from "react";
import { RowActionHookRet } from "../types";
import { approvePendaftaran } from "../clients";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

type RowActionHookParams = {
  nim: string;
};

export default function useRowAction({
  nim,
}: RowActionHookParams): RowActionHookRet {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [editDosenPembimbingDialogOpen, setEditDosenPembimbingDialogOpen] =
    useState(false);

  const { trigger: acceptTrigger, error: acceptError } = useSWRMutation(
    `/approval/${nim}/approve`,
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
    `/approval/${nim}/reject`,
    async (_, { arg }: { arg: { id: string } }) => {
      try {
        const res = await approvePendaftaran(arg.id);
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
      setRejectDialogOpen(false);
    }
  };

  return {
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
