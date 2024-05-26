import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  SubmisiTugasBody,
  SubmitTugasFormData,
  SubmitTugasFormSchema,
  TugasDetail,
} from "../types";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getSubmisiTugas, getTugasDetail, putSubmisiTugas } from "../clients";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

export default function useSubmisiTugasImpl() {
  const { idTugas } = useParams<{ idTugas: string }>();

  const { data: fetchedSubmisi } = useSWR(
    `/tugas/${idTugas}/submisi`,
    async () => {
      const res = await getSubmisiTugas(idTugas || "");
      return res.data;
    },
  );

  const [dataTugas, setDataTugas] = useState<TugasDetail | null>(null);

  const { data: fetchedTugas } = useSWR(
    `/tugas/${idTugas}/detail`,
    async () => {
      const res = await getTugasDetail(idTugas || "");
      const mapped: TugasDetail = {
        judul: res.data.judul,
        deskripsi: res.data.deskripsi,
        waktuMulai: new Date(res.data.waktuMulai),
        waktuSelesai: new Date(res.data.waktuSelesai),
        berkasTugas: res.data.berkasTugas,
        createdAt: new Date(res.data.createdAt),
        updatedAt: new Date(res.data.updatedAt),
        namaPembuat: res.data.pembuat.nama,
        namaPengubah: res.data.pengubah.nama,
        matakuliah: `${res.data.kelas.mataKuliah.kode} ${res.data.kelas.mataKuliah.nama}`,
      };

      return mapped;
    },
  );

  useEffect(() => {
    if (fetchedTugas) {
      setDataTugas(fetchedTugas);
    }
  }, [fetchedTugas]);

  const form = useForm<SubmitTugasFormData>({
    defaultValues: {
      jawaban: "",
      berkas: [],
    },
    resolver: zodResolver(SubmitTugasFormSchema),
  });

  useEffect(() => {
    if (fetchedSubmisi) {
      form.setValue("id", fetchedSubmisi.id);
      form.setValue("jawaban", fetchedSubmisi.jawaban);
      const fetchedBerkas = fetchedSubmisi.berkasSubmisiTugas.map((berkas) => ({
        nama: berkas.nama,
        url: berkas.url,
      }));
      form.setValue("berkas", fetchedBerkas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedSubmisi]);

  const { trigger } = useSWRMutation(
    "/submisi-tugas",
    async (_, { arg }: { arg: SubmisiTugasBody }) => {
      return await putSubmisiTugas(arg);
    },
  );

  const onSubmit = async (values: SubmitTugasFormData) => {
    try {
      const data: SubmisiTugasBody = {
        id: fetchedSubmisi?.id,
        isSubmitted: true,
        jawaban: values.jawaban,
        berkasSubmisiTugas: values.berkas,
        tugasId: idTugas || "",
      };
      await trigger(data);
      toast.success("Berhasil mengirimkan tugas");
    } catch (error) {
      toast.error("Gagal mengirimkan tugas");
    }
  };

  const onSave = async (values: SubmitTugasFormData) => {
    try {
      const data: SubmisiTugasBody = {
        id: fetchedSubmisi?.id,
        isSubmitted: false,
        jawaban: values.jawaban,
        berkasSubmisiTugas: values.berkas,
        tugasId: idTugas || "",
      };
      await trigger(data);
      toast.success("Berhasil menyimpan tugas");
    } catch (error) {
      toast.error("Gagal menyimpan tugas");
    }
  };

  return {
    form,
    dataTugas,
    onSubmit,
    onSave,
  };
}
