import useSession from "@/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  getDetailSidSemS2,
  getIdMahasiswa,
  getPlaceholdersS1,
  isRegisteredSidSemS1,
  postRegistraionSidSemForS1,
  postRegistrasiSidSemS2,
} from "../client";
import {
  RegistrationSidSemFormData,
  RegistrationSidSemFormSchema,
} from "../constants";
import {
  Placeholders,
  PostRegistraionSidSemReqDataS2,
  postRegistraionSidSemDataS1,
} from "../types";

const useRegistrationSidSem = () => {
  const { strata, tipe } = useParams();
  const { data: sessionData } = useSession();
  const navigate = useNavigate();

  // TODO dont' check type like this
  const tipePendaftaran =
    tipe === "sidang"
      ? "Sidang"
      : tipe === "seminar"
        ? "Seminar"
        : tipe === "seminar-proposal"
          ? "Seminar-Proposal"
          : tipe === "seminar-tesis"
            ? "seminar-tesis"
            : tipe === "sidang"
              ? "Sidang"
              : "";

  const defaultData: Placeholders = {
    name: "",
    nim: "",
    program_studi: "",
    jalur_pilihan: "",
    topik: "",
    dosbing: "",
  };

  const { data = defaultData } = useSWR(`registration-sidsem`, async () => {
    let data: Placeholders;

    if (strata?.toUpperCase() === "S1") {
      const resIsRegistered = await isRegisteredSidSemS1(
        tipePendaftaran.toLowerCase(),
      );
      if (resIsRegistered.data.data) {
        navigate("/not-found");
      }
      const response = await getIdMahasiswa();

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
      // TODO has registered guard
      const responseDetail = (await getDetailSidSemS2(sessionData?.id ?? ""))
        .data;
      data = {
        name: responseDetail.namaMahasiswa,
        nim: responseDetail.nimMahasiswa,
        program_studi: "", // TODO program studi
        jalur_pilihan: responseDetail.jalurPilihan,
        topik: responseDetail.judulTopik,
        dosbing: responseDetail.dosenPembimbing.join(", "),
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

  const { trigger: triggerS1 } = useSWRMutation(
    "/mahasiswa/pendaftaran-sidsem",
    async (_, { arg }: { arg: postRegistraionSidSemDataS1 }) => {
      return await postRegistraionSidSemForS1(arg);
    },
  );

  const { trigger: triggerS2 } = useSWRMutation(
    "/registrasi-sidsem",
    async (_, { arg }: { arg: PostRegistraionSidSemReqDataS2 }) => {
      return await postRegistrasiSidSemS2(arg);
    },
  );

  const onSubmit = async (
    values: Omit<postRegistraionSidSemDataS1, "id_mahasiswa">,
  ) => {
    if (strata?.toUpperCase() === "S1") {
      const data: postRegistraionSidSemDataS1 = {
        id_mahasiswa: sessionData?.id ?? "",
        tipe: tipe,
        judul_proposal: values.judul_proposal,
        deskripsi: values.deskripsi,
        berkas: values.berkas,
      };

      try {
        await triggerS1(data);
        toast.success("Registration submitted successfully.");
      } catch (error) {
        toast.error("Failed to submit Registration");
      }
    } else {
      const data: PostRegistraionSidSemReqDataS2 = {
        tipe:
          tipePendaftaran.toLowerCase() === "seminar-proposal"
            ? "SEMINAR_1"
            : tipePendaftaran.toLowerCase() === "seminar-tesis"
              ? "SEMINAR_2"
              : "SIDANG",
        judulSidsem: values.judul_proposal,
        deskripsiSidsem: values.deskripsi,
        berkasSidsem: values.berkas.map(({ link, nama }) => ({
          nama,
          url: link,
        })),
      };

      try {
        await triggerS2(data);
        toast.success("Registration submitted successfully.");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to submit Registration");
      }
    }
  };

  return {
    data,
    form,
    onSubmit,
  };
};

export default useRegistrationSidSem;
