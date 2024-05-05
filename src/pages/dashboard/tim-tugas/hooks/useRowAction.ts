import { useState } from "react";
// import { Row } from "@tanstack/react-table";
import { toast } from "react-toastify";
// import { DashTableData } from "../types";

// type HookProps = {
//   row: Row<DashTableData>;
//   searchValue: string;
// };

export default function useRowAction() {
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const handleArchive = async () => {
    const toastId = toast.loading("Mengarsipkan mahasiswa...");
    // await triggerApproveS2();

    // if (approveS2Error) {
    //   toast.update(toastId, {
    //     render: "Terjadi kesalahan dalam menerima pendaftaran",
    //     type: "error",
    //     isLoading: false,
    //     autoClose: 1000,
    //   });
    // } else {
    toast.update(toastId, {
      render: "Berhasil mengarsipkan mahasiswa",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    setArchiveDialogOpen(false);
    // }
  };

  return {
    archiveDialogOpen,
    setArchiveDialogOpen,
    handleArchive,
  };
}
