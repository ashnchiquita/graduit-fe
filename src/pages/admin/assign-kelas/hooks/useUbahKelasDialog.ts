import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { getDaftarKelas, ubahKelasDosen, ubahKelasMahasiswa } from "../clients";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { Table } from "@tanstack/react-table";
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

  const { trigger: triggerUbahMhs, error: ubahMhsError } = useSWRMutation(
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

  const { trigger: triggerUbahDosen, error: ubahDosenError } = useSWRMutation(
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
      await triggerUbahMhs({
        kelasIds: kelas.map((k) => k.id),
      });

      if (ubahMhsError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil mengubah kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
        form.setValue("kelas", kelas);
      }
    } else {
      await triggerUbahDosen({
        kelasIds: kelas.map((k) => k.id),
      });

      if (ubahDosenError) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah kelas",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(toastId, {
          render: "Berhasil mengubah kelas",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        table.toggleAllRowsSelected(false);
        setDialogOpen(false);
        form.setValue("kelas", kelas);
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
