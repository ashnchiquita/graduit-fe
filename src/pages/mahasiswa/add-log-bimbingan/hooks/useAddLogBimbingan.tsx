import { useForm } from "react-hook-form";
import {
  AddLogBimbinganFormData,
  AddLogBimbinganFormSchema,
} from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { PostLogBimbinganReqData } from "../types";
import { postLogBimbingan } from "../client";
import { toast } from "react-toastify";

const useAddLogBimbigan = () => {
  //TODO bahas page selanjutnya habis nambah log bimbingan apa
  const form = useForm<AddLogBimbinganFormData>({
    defaultValues: {
      date: undefined,
      laporan_kemajuan: "",
      todo: "",
      next_bimbingan: undefined,
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
    const data: PostLogBimbinganReqData = {
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
