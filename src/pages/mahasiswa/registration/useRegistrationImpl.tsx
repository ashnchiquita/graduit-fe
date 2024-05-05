import useSession from "@/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { getRegS2, postRegistrasiTesisS2 } from "./clients";
import { RegistrationFormData, RegistrationFormSchema } from "./constants";
import { PostRegistrasiTesisRequestData } from "./types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { RoleEnum } from "@/types/session-data";

const useRegistrationImpl = () => {
  const navigate = useNavigate();
  const [isNewOptionCreated, setNewOptionCreated] = useState(false);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      lecturer: "",
      stream: "",
      topic: "",
      topicDescription: "",
    },
    resolver: zodResolver(RegistrationFormSchema),
  });

  const { data: sessionData } = useSession();

  const { trigger } = useSWRMutation(
    `/status-registrasi/${sessionData?.id}`,
    async (_, { arg }: { arg: PostRegistrasiTesisRequestData }) => {
      if (!sessionData) return;

      if (sessionData.roles.includes(RoleEnum.S1_MAHASISWA)) {
        // TODO: S1 ganti endpoint post di sini
        return await postRegistrasiTesisS2(arg);
      } else if (sessionData.roles.includes(RoleEnum.S2_MAHASISWA)) {
        return await postRegistrasiTesisS2(arg);
      }
    },
  );

  const { data: currReg = [], isLoading: isRegLoading } = useSWR(
    `/status-registrasi/${sessionData?.id}`,
    async () => {
      if (!sessionData?.id) return [];

      if (sessionData.roles.includes(RoleEnum.S1_MAHASISWA)) {
        // TODO: S1 fetch registrasi di sini buat ngecek mhs nya lagi ada regis yg pending ga
        // TODO: kalo ada, redirect ke daftar pengajuan (ini udah dihandle)
        const { data } = await getRegS2(sessionData.id);

        const resData = data.map((item) => ({
          status_pendaftaran: {
            status: true,
            topik: item.judulTopik,
            dosen_pembimbing: item.dosenPembimbing[0].nama,
            pengiriman_registrasi: new Date(item.waktuPengiriman),
            persetujuan_dosen_pembimbing: item.waktuKeputusan
              ? new Date(item.waktuKeputusan)
              : null,
            jadwal_interview: item.jadwalInterview
              ? new Date(item.jadwalInterview)
              : null,
            pengesahan_dosen_pembimbing:
              item.status === "APPROVED"
                ? true
                : item.status === "REJECTED"
                  ? false
                  : null,
          },
        }));

        return resData;
      } else if (sessionData.roles.includes(RoleEnum.S2_MAHASISWA)) {
        const { data } = await getRegS2(sessionData.id);

        const resData = data.map((item) => ({
          status_pendaftaran: {
            status: true,
            topik: item.judulTopik,
            dosen_pembimbing: item.dosenPembimbing[0].nama,
            pengiriman_registrasi: new Date(item.waktuPengiriman),
            persetujuan_dosen_pembimbing: item.waktuKeputusan
              ? new Date(item.waktuKeputusan)
              : null,
            jadwal_interview: item.jadwalInterview
              ? new Date(item.jadwalInterview)
              : null,
            pengesahan_dosen_pembimbing:
              item.status === "APPROVED"
                ? true
                : item.status === "REJECTED"
                  ? false
                  : null,
          },
        }));

        return resData;
      } else {
        return [];
      }
    },
  );

  useEffect(() => {
    if (
      currReg.length > 0 &&
      !currReg.every(
        (reg) => reg.status_pendaftaran.pengesahan_dosen_pembimbing === false,
      )
    ) {
      console.log(currReg);
      navigate("/daftar-pengajuan");
    }
  }, [currReg, navigate]);

  const onSubmit = async (values: RegistrationFormData) => {
    const data: PostRegistrasiTesisRequestData = {
      idMahasiswa: sessionData?.id ?? "",
      idPenerima: values.lecturer,
      jalurPilihan: values.stream,
      idTopik: !isNewOptionCreated ? values.topic : undefined,
      judulTopik: isNewOptionCreated ? values.topic : undefined,
      deskripsiTopik: isNewOptionCreated ? values.topicDescription : undefined,
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
    setNewOptionCreated,
    isRegLoading,
    strata: sessionData?.roles.includes(RoleEnum.S1_MAHASISWA)
      ? "S1"
      : sessionData?.roles.includes(RoleEnum.S2_MAHASISWA)
        ? "S2"
        : "",
  };
};

export default useRegistrationImpl;
