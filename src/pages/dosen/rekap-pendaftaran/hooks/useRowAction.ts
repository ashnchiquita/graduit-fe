import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { updateStatusS2 } from "../clients";
import { Mahasiswa, RowActionHookRet } from "../types";

type HookProps = {
  row: Row<Mahasiswa>;
  searchValue: string;
};

export default function useRowAction({
  row,
  searchValue,
}: HookProps): RowActionHookRet {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const { trigger: triggerApproveS2 } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async () => await updateStatusS2(row.original.id, "APPROVED"),
  );
  const { trigger: triggerReject } = useSWRMutation(
    ["/rekap-pendaftaran/dosbim/s2", searchValue],
    async () => await updateStatusS2(row.original.id, "REJECTED"),
  );

  const handleAccept = async () => {
    const toastId = toast.loading("Menerima pendaftaran...");
    try {
      await triggerApproveS2();

      toast.update(toastId, {
        render: "Berhasil menerima pendaftaran",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setAcceptDialogOpen(false);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak pendaftaran...");
    try {
      await triggerReject();
      toast.update(toastId, {
        render: "Penolakan berhasil",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setRejectDialogOpen(false);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
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
