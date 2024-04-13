import { useForm } from "react-hook-form";
import {
  AddLogBimbinganFormData,
  AddLogBimbinganFormSchema,
} from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { PostLogBimbinganReqData } from "../types";
import { postLogBimbingan } from "../client";

const useAddLogBimbigan = () => {
  const form = useForm<AddLogBimbinganFormData>({
    defaultValues: {
      date: "",
      laporan_kemajuan: "",
      todo: "",
      next_bimbingan: "",
      status: false,
      berkas: [],
    },
    resolver: zodResolver(AddLogBimbinganFormSchema),
  });

  const { trigger } = useSWRMutation(
    "/mahasiswa/add-bimbingan-log",
    async (_, { arg }: { arg: PostLogBimbinganReqData }) => {
      return await postLogBimbingan(arg);
    },
  );

  const onSubmit = async (values: AddLogBimbinganFormData) => {
    console.log("submitting");
    const data: PostLogBimbinganReqData = {
      date: values.date,
      laporan_kemajuan: values.laporan_kemajuan,
      todo: values.todo,
      next_bimbingan: values.next_bimbingan || "",
      status: false,
      berkas: values.berkas || [],
    };

    try {
      await trigger(data);
    } catch (error) {
      console.error("Failed to submit Bimbingan Log");
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useAddLogBimbigan;
