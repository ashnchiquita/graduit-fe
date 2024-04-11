import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { postRegistrasiTesis } from "./clients";
import { RegistrationFormData, RegistrationFormSchema } from "./constants";
import { PostRegistrasiTesisRequestData } from "./types";

const useRegistrationImpl = () => {
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      lecturer: "",
      stream: "",
      topic: "",
      topicDescription: "",
    },
    resolver: zodResolver(RegistrationFormSchema),
  });

  const { trigger } = useSWRMutation(
    "/registrasi-topik",
    async (_, { arg }: { arg: PostRegistrasiTesisRequestData }) => {
      return await postRegistrasiTesis(arg);
    },
  );

  const onSubmit = async (values: RegistrationFormData) => {
    const data: PostRegistrasiTesisRequestData = {
      // TODO remove hard code
      idMahasiswa: "75740361-3cc0-4520-8e08-7f8ab99f46fe",
      idPenerima: values.lecturer,
      jalurPilihan: values.stream,
      judulTopik: values.topic,
      deskripsi: values.topicDescription,
    };

    try {
      await trigger(data);
      toast.success("Berhasil melakukan registrasi");
      navigate("/daftar-pengajuan");
    } catch (error) {
      toast.success("Gagal melakukan registrasi");
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useRegistrationImpl;
