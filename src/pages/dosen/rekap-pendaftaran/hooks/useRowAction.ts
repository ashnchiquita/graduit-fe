import { useState } from "react";
import { Mahasiswa, RowActionHookRet } from "../types";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

type HookProps = {
  setData: React.Dispatch<React.SetStateAction<Mahasiswa[]>>;
};

export default function useRowAction({ setData }: HookProps): RowActionHookRet {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const handleAccept = (nim: string) => {
    setData((prev) =>
      prev.map((mhs) =>
        mhs.nim === nim
          ? { ...mhs, status: StatusPendaftaranEnum.ACCEPTED }
          : mhs,
      ),
    );
    setAcceptDialogOpen(false);
  };

  const handleReject = (nim: string) => {
    setData((prev) =>
      prev.map((mhs) =>
        mhs.nim === nim
          ? { ...mhs, status: StatusPendaftaranEnum.REJECTED }
          : mhs,
      ),
    );
    setRejectDialogOpen(false);
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
