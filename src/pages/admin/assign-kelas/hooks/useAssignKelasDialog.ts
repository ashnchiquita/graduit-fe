import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import {
  assignKelasDosen,
  assignKelasMahasiswa,
  getDaftarKelas,
} from "../clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { Table } from "@tanstack/react-table";
import { KelasPengguna } from "../types";

export default function useAssignKelasDialog(
  penggunaIds: string[],
  type: "DOSEN" | "MAHASISWA",
  searchValue: string,
  table: Table<KelasPengguna>,
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const formSchema = z.object({
    kelas: z
      .object({
        id: z.string(),
        nama: z.string(),
      })
      .array(),
  });

  const { data: daftarKelas = [] } = useSWR(
    "/daftar-kelas",
    async (): Promise<
      {
        nama: string;
        id: string;
      }[]
    > => {
      const { data } = await getDaftarKelas();
      return data.map((d) => ({
        nama: `${d.nama_mata_kuliah} - ${d.nomor.padStart(2, "0")}`,
        id: d.id,
      }));
    },
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kelas: [],
    },
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(
    form.getValues().kelas.length === 0,
  );

  const { trigger: triggerAssignMhs, error: assignMhsError } = useSWRMutation(
    ["/kelas/mahasiswa", searchValue],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          penggunaIds: string[];
          kelasIds: string[];
        };
      },
    ) => {
      await assignKelasMahasiswa({ ...arg });
    },
  );

  const { trigger: triggerAssignDosen, error: assignDosenError } =
    useSWRMutation(
      ["/kelas/dosen", searchValue],
      async (
        _,
        {
          arg,
        }: {
          arg: {
            penggunaIds: string[];
            kelasIds: string[];
          };
        },
      ) => {
        await assignKelasDosen({ ...arg });
      },
    );

  const handleSubmit = async ({ kelas }: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Mengassign kelas...");
    if (type === "MAHASISWA") {
      await triggerAssignMhs({
        penggunaIds: penggunaIds,
        kelasIds: kelas.map((k) => k.id),
      });

      if (assignMhsError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengassign kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil mengassign kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        form.reset();
        table.toggleAllRowsSelected(false);
        setSubmitDisabled(true);
        setDialogOpen(false);
      }
    } else {
      await triggerAssignDosen({
        penggunaIds: penggunaIds,
        kelasIds: kelas.map((k) => k.id),
      });

      if (assignDosenError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengassign kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil mengassign kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        form.reset();
        table.toggleAllRowsSelected(false);
        setSubmitDisabled(true);
        setDialogOpen(false);
      }
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    form,
    isSubmitDisabled,
    handleSubmit,
    setSubmitDisabled,
    daftarKelas,
  };
}
