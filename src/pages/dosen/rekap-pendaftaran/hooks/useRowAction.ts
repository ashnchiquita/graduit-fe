import { useState } from "react";
import { Mahasiswa, RowActionHookRet } from "../types";
import { Row } from "@tanstack/react-table";
import { updateStatusS2 } from "../clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

type HookProps = {
  row: Row<Mahasiswa>;
  searchValue: string;
};

export default function useRowAction({
  row,
  searchValue,
}: HookProps): RowActionHookRet {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const { trigger: triggerApproveS2, error: approveS2Error } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async () => await updateStatusS2(row.original.id, "APPROVED"),
  );
  const { trigger: triggerReject, error: rejectError } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async () => await updateStatusS2(row.original.id, "REJECTED"),
  );

  const handleAccept = async () => {
    const toastId = toast.loading("Menerima pendaftaran...");
    await triggerApproveS2();

    if (approveS2Error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menerima pendaftaran",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setAcceptDialogOpen(false);
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak pendaftaran...");
    await triggerReject();

    if (rejectError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Penolakan berhasil",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setRejectDialogOpen(false);
    }
  };

  return {
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    handleAccept,
    handleReject,
  };
}
