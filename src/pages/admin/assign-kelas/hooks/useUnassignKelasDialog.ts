import { useState } from "react";
import { unassignKelasDosen, unassignKelasMahasiswa } from "../clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { Table } from "@tanstack/react-table";
import { KelasPengguna } from "../types";

export default function useUnassignKelasDialog(
  penggunaIds: string[],
  type: "DOSEN" | "MAHASISWA",
  searchValue: string,
  table: Table<KelasPengguna>,
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { trigger: triggerUnassignMhs, error: unassignMhsError } =
    useSWRMutation(
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
  const { trigger: triggerUnassignDosen, error: unassignDosenError } =
    useSWRMutation(
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
      await triggerUnassignMhs({
        penggunaIds: penggunaIds,
      });

      if (unassignMhsError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam menghapus kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil menghapus kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
      }
    } else {
      await triggerUnassignDosen({
        penggunaIds: penggunaIds,
      });

      if (unassignDosenError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam menghapus kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil menghapus kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
      }
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    handleSubmit,
  };
}
