import useSession from "@/hooks/useSession";
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

  const { data: sessionData } = useSession();

  const onSubmit = async (values: RegistrationFormData) => {
    const data: PostRegistrasiTesisRequestData = {
      idMahasiswa: sessionData?.id ?? "",
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
