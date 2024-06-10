import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { getDaftarKelas, ubahKelasDosen, ubahKelasMahasiswa } from "../clients";
import { KelasPengguna } from "../types";

export default function useUbahKelasDialog(
  penggunaId: string,
  type: "DOSEN" | "MAHASISWA",
  searchValue: string,
  table: Table<KelasPengguna>,
  initKelas: {
    nama: string;
    id: string;
  }[],
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kelas: [],
    },
  });

  useEffect(() => {
    form.setValue("kelas", initKelas);
  }, [initKelas, form]);

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

  const { trigger: triggerUbahMhs } = useSWRMutation(
    ["/kelas/mahasiswa", searchValue],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          kelasIds: string[];
        };
      },
    ) => {
      await ubahKelasMahasiswa({ ...arg, penggunaId });
    },
  );

  const { trigger: triggerUbahDosen } = useSWRMutation(
    ["/kelas/dosen", searchValue],
    async (
      _,
      {
        arg,
      }: {
        arg: {
          kelasIds: string[];
        };
      },
    ) => {
      await ubahKelasDosen({ ...arg, penggunaId });
    },
  );

  const handleSubmit = async ({
    kelas,
  }: z.infer<typeof formSchema>): Promise<void> => {
    const toastId = toast.loading("Mengubah kelas...");
    if (type === "MAHASISWA") {
      try {
        await triggerUbahMhs({
          kelasIds: kelas.map((k) => k.id),
        });
        toast.update(toastId, {
          render: "Berhasil mengubah kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
        form.setValue("kelas", kelas);
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } else {
      try {
        await triggerUbahDosen({
          kelasIds: kelas.map((k) => k.id),
        });

        toast.update(toastId, {
          render: "Berhasil mengubah kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
        form.setValue("kelas", kelas);
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah kelas",
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
    handleSubmit,
    daftarKelas,
    initKelas,
  };
}
