import { useForm } from "react-hook-form";
import {
  AddLogBimbinganFormData,
  AddLogBimbinganFormSchema,
} from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { PostLogBimbinganReqData } from "../types";
import {
  getNimMahasiswa,
  postLogBimbingan,
  postLogBimbinganForS2,
} from "../client";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useState } from "react";

const useAddLogBimbigan = () => {
  //TODO bahas page selanjutnya habis nambah log bimbingan apa
  const [idMahasiswa, setIdMahasiswa] = useState<string>("");

  const {} = useSWR(`/auth/self`, async () => {
    const response = await getNimMahasiswa();
    setIdMahasiswa(response.data.id);
  });

  const { strata } = useParams();

  const form = useForm<AddLogBimbinganFormData>({
    defaultValues: {
      id_mahasiswa: idMahasiswa,
      date: undefined,
      laporan_kemajuan: "",
      todo: "",
      next_bimbingan: undefined,
      status: false,
      berkas: [],
    },
    resolver: zodResolver(AddLogBimbinganFormSchema),
  });

  const apiFunction =
    strata === "S1" ? postLogBimbingan : postLogBimbinganForS2;

  const { trigger } = useSWRMutation(
    "/mahasiswa/add-bimbingan-log",
    async (_, { arg }: { arg: PostLogBimbinganReqData }) => {
      return await apiFunction(arg);
    },
  );

  const onSubmit = async (values: AddLogBimbinganFormData) => {
    const data: PostLogBimbinganReqData = {
      id_mahasiswa: idMahasiswa,
      date: values.date,
      laporan_kemajuan: values.laporan_kemajuan,
      todo: values.todo,
      next_bimbingan: values.next_bimbingan || undefined,
      status: false,
      berkas: values.berkas || [],
    };

    try {
      await trigger(data);
      toast.success("Bimbingan log submitted successfully.");
    } catch (error) {
      console.error("Failed to submit Bimbingan Log");
      toast.error("Failed to submit Bimbingan Log.");
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useAddLogBimbigan;
