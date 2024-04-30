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
import { Placeholders } from "../types";
import { getIdMahasiswa } from "../client";

const useRegistrationSidSem = () => {
  const { strata } = useParams();

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
    const idMahasiswa = response.data.id;

    if (strata?.toUpperCase() === "S1") {
      const resPlaceholders = await getPlaceholdersS1(idMahasiswa ?? "");
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
      const resPlaceholders = await getPlaceholdersS1(idMahasiswa ?? "");
      data = {
        name: resPlaceholders.data.data.nama,
        nim: resPlaceholders.data.data.nim,
        program_studi: resPlaceholders.data.data.jalur_pilihan,
        jalur_pilihan: "",
        topik: resPlaceholders.data.data.topik,
        dosbing: resPlaceholders.data.data.dosbing,
      };
    }
    console.log(data);
    return data;
  });

  const form = useForm<RegistrationSidSemFormData>({
    defaultValues: {
      //   id_mahasiswa: nim,
      //   date: undefined,
      //   laporan_kemajuan: "",
      //   todo: "",
      //   next_bimbingan: undefined,
      //   status: false,
      //   berkas: [],
    },
    resolver: zodResolver(RegistrationSidSemFormSchema),
  });

  const apiFunction =
    strata === "S1" ? postRegistraionSidSemForS1 : postRegistraionSidSemForS1;

  const { trigger } = useSWRMutation(
    "/mahasiswa/add-bimbingan-log",
    async (_, { arg }: { arg: any }) => {
      return await apiFunction(arg);
    },
  );

  const onSubmit = async (values: any) => {
    const data: any = {
      values: values,
    };

    try {
      await trigger(data);
    } catch (error) {
      console.error("Failed to submit Bimbingan Log");
      toast.error("Failed to submit Bimbingan Log.");
    } finally {
      toast.success("Registration submitted successfully.");
    }
  };

  console.log(data);
  return {
    data,
    form,
    onSubmit,
  };
};

export default useRegistrationSidSem;
