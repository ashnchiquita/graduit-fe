import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { patchArchiveMahasiswa } from "../client";

// type HookProps = {
//   row: Row<DashTableData>;
//   searchValue: string;
// };

export default function useRowAction(
  id: string,
  fetchData: () => Promise<any>,
) {
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const { trigger } = useSWRMutation("/akun/archive", async () => {
    return await patchArchiveMahasiswa(id);
  });

  const handleArchive = async () => {
    const toastId = toast.loading("Mengarsipkan mahasiswa...");

    try {
      await trigger();
      toast.update(toastId, {
        render: "Berhasil mengarsipkan mahasiswa",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setArchiveDialogOpen(false);
      fetchData();
    }
  };

  return {
    archiveDialogOpen,
    setArchiveDialogOpen,
    handleArchive,
  };
}
