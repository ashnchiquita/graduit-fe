import { useForm } from "react-hook-form";
import { SimpanKontakFormData, SimpanKontakFormSchema } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
// import useSWRMutation from "swr/mutation";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
// import useSWR from "swr";
// import { useState } from "react";

const useProfileDosbim = () => {
  //TODO bahas page selanjutnya habis nambah log bimbingan apa
  //   const [idMahasiswa, setIdMahasiswa] = useState<string>("");

  //   const {} = useSWR(`/auth/self`, async () => {
  //     const response = await getNimMahasiswa();
  //     setIdMahasiswa(response.data.id);
  //   });

  //   const { strata } = useParams();

  const form = useForm<SimpanKontakFormData>({
    defaultValues: {
      whatsapp: "081111111111",
      msteams: "tes@msteams",
      email: "tes@tes.com",
      telp: "081111111111",
    },
    resolver: zodResolver(SimpanKontakFormSchema),
  });

  //   const apiFunction =
  //     strata === "S1" ? postLogBimbingan : postLogBimbinganForS2;

  //   const { trigger } = useSWRMutation(
  //     "/mahasiswa/add-bimbingan-log",
  //     async (_, { arg }: { arg: PostLogBimbinganReqData }) => {
  //       return await apiFunction(arg);
  //     },
  //   );

  const onSubmit = async (values: SimpanKontakFormData) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};

export default useProfileDosbim;
