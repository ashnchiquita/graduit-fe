import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import {
  assignKelasDosen,
  assignKelasMahasiswa,
  getDaftarKelas,
} from "../clients";
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

  const { trigger: triggerAssignMhs } = useSWRMutation(
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

  const { trigger: triggerAssignDosen } = useSWRMutation(
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
      try {
        await triggerAssignMhs({
          penggunaIds: penggunaIds,
          kelasIds: kelas.map((k) => k.id),
        });
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
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengassign kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } else {
      try {
        await triggerAssignDosen({
          penggunaIds: penggunaIds,
          kelasIds: kelas.map((k) => k.id),
        });
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
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengassign kelas",
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
    form,
    isSubmitDisabled,
    handleSubmit,
    setSubmitDisabled,
    daftarKelas,
  };
}
