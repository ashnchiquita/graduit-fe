import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { unassignKelasDosen, unassignKelasMahasiswa } from "../clients";
import { KelasPengguna } from "../types";

export default function useUnassignKelasDialog(
  penggunaIds: string[],
  type: "DOSEN" | "MAHASISWA",
  searchValue: string,
  table: Table<KelasPengguna>,
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { trigger: triggerUnassignMhs } = useSWRMutation(
    ["/kelas/mahasiswa", searchValue],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          penggunaIds: string[];
        };
      },
    ) => {
      await unassignKelasMahasiswa({ ...arg });
    },
  );
  const { trigger: triggerUnassignDosen } = useSWRMutation(
    ["/kelas/dosen", searchValue],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          penggunaIds: string[];
        };
      },
    ) => {
      await unassignKelasDosen({ ...arg });
    },
  );

  const handleSubmit = async () => {
    const toastId = toast.loading("Menghapus kelas...");
    if (type === "MAHASISWA") {
      try {
        await triggerUnassignMhs({
          penggunaIds: penggunaIds,
        });

        toast.update(toastId, {
          render: "Berhasil menghapus kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam menghapus kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } else {
      try {
        await triggerUnassignDosen({
          penggunaIds: penggunaIds,
        });

        toast.update(toastId, {
          render: "Berhasil menghapus kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam menghapus kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    handleSubmit,
  };
}
