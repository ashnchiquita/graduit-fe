import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { UbahNilaiFormData, UbahNilaiFormSchema } from "../constants";
import { MahasiswaKelas } from "../types";

export default function useUbahNilaiDialog(
  isOpen: boolean,
  closeDialog: () => void,
  updateData: () => Promise<any>,
  data: MahasiswaKelas[],
) {
  const form = useForm<UbahNilaiFormData>({
    defaultValues: {
      nilai: undefined,
    },
    resolver: zodResolver(UbahNilaiFormSchema),
  });

  useEffect(() => {
    if (isOpen)
      form.reset({
        nilai:
          data.length === 1 && data[0].nilai !== null
            ? data[0].nilai.toString()
            : undefined,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const { trigger: triggerPost } = useSWRMutation(
    "/registrasi-topik",
    async () => {
      // return await updateGrades(arg);
    },
  );

  const onSubmit = async (values: UbahNilaiFormData) => {
    console.log(values);
    try {
      // await triggerPost();

      toast.success(`Berhasil mengubah nilai`);
      closeDialog();
      updateData();
    } catch (error) {
      toast.error(`Gagal mengubah nilai`);
    }
  };

  return { onSubmit, form };
}
