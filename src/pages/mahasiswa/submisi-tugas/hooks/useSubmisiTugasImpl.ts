import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SubmitTugasFormData, SubmitTugasFormSchema } from "../types";

export default function useSubmisiTugasImpl() {
  const form = useForm<SubmitTugasFormData>({
    defaultValues: {
      jawaban: "",
      berkas: [],
    },
    resolver: zodResolver(SubmitTugasFormSchema),
  });

  const onSubmit = async (values: SubmitTugasFormData) => {
    try {
      // TODO: call API
      console.log(values);
      toast.success("Berhasil mengirimkan tugas");
    } catch (error) {
      toast.error("Gagal mengirimkan tugas");
    }
  };

  const onSave = async (values: SubmitTugasFormData) => {
    try {
      // TODO: call API
      console.log(values);
      toast.success("Berhasil menyimpan tugas");
    } catch (error) {
      toast.error("Gagal menyimpan tugas");
    }
  };

  return {
    form,
    onSubmit,
    onSave,
  };
}
