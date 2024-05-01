import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import {
  RegistrationSidSemFormData,
  RegistrationSidSemFormSchema,
} from "../constants";
import { getPlaceholdersS1, postRegistraionSidSemForS1 } from "../client";
import { Placeholders, postRegistraionSidSemDataS1 } from "../types";
import { getIdMahasiswa } from "../client";

const useRegistrationSidSem = () => {
  const { strata, tipe } = useParams();

  const defaultData: Placeholders = {
    name: "",
    nim: "",
    program_studi: "",
    jalur_pilihan: "",
    topik: "",
    dosbing: "",
  };

  const { data = defaultData } = useSWR(`/registration`, async () => {
    let data: Placeholders;

    const response = await getIdMahasiswa();

    if (strata?.toUpperCase() === "S1") {
      const resPlaceholders = await getPlaceholdersS1(response.data.id ?? "");
      data = {
        name: resPlaceholders.data.data.nama,
        nim: resPlaceholders.data.data.nim,
        program_studi: resPlaceholders.data.data.jalur_pilihan,
        jalur_pilihan: "",
        topik: resPlaceholders.data.data.judul,
        dosbing: resPlaceholders.data.data.dosbing,
      };
    } else {
      // TODO get placeholders for S2
      const resPlaceholders = await getPlaceholdersS1(response.data.id ?? "");
      data = {
        name: resPlaceholders.data.data.nama,
        nim: resPlaceholders.data.data.nim,
        program_studi: resPlaceholders.data.data.jalur_pilihan,
        jalur_pilihan: "",
        topik: resPlaceholders.data.data.topik,
        dosbing: resPlaceholders.data.data.dosbing,
      };
    }
    return data;
  });

  const form = useForm<RegistrationSidSemFormData>({
    defaultValues: {
      tipe: "",
      judul_proposal: "",
      deskripsi: "",
      berkas: [],
    },
    resolver: zodResolver(RegistrationSidSemFormSchema),
  });

  const apiFunction =
    strata === "S1" ? postRegistraionSidSemForS1 : postRegistraionSidSemForS1;

  const { trigger } = useSWRMutation(
    "/mahasiswa/pendaftaran-sidsem",
    async (_, { arg }: { arg: any }) => {
      return await apiFunction(arg);
    },
  );

  const onSubmit = async (values: postRegistraionSidSemDataS1) => {
    const response = await getIdMahasiswa();
    const data: postRegistraionSidSemDataS1 = {
      id_mahasiswa: response.data.id,
      tipe: tipe,
      judul_proposal: values.judul_proposal,
      deskripsi: values.deskripsi,
      berkas: values.berkas,
    };

    try {
      await trigger(data);
      toast.success("Registration submitted successfully.");
    } catch (error) {
      toast.error("Failed to submit Registration");
    }
  };

  return {
    data,
    form,
    onSubmit,
  };
};

export default useRegistrationSidSem;
