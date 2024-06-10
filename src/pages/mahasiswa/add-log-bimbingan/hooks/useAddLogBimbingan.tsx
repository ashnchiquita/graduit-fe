import { useForm } from "react-hook-form";
import {
  AddLogBimbinganFormData,
  AddLogBimbinganFormSchema,
} from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { PostLogBimbinganReqData } from "../types";
import {
  getNimMahasiswa,
  postLogBimbingan,
  postLogBimbinganForS2,
} from "../client";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { useNavigate } from "react-router-dom";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

const useAddLogBimbigan = () => {
  //TODO bahas page selanjutnya habis nambah log bimbingan apa
  const [idMahasiswa, setIdMahasiswa] = useState<string>("");
  const { makeToast } = useCustomToast();

  useSWR(`/auth/self`, async () => {
    const response = await getNimMahasiswa();
    setIdMahasiswa(response.data.id);
  });

  const { data: sessionData } = useSession();
  const navigate = useNavigate();

  const [strata, setStrata] = useState("S1");
  useEffect(() => {
    setStrata(sessionData?.roles.includes(RoleEnum.S1_MAHASISWA) ? "S1" : "S2");
  }, [sessionData]);

  const form = useForm<AddLogBimbinganFormData>({
    defaultValues: {
      id_mahasiswa: idMahasiswa,
      date: undefined,
      laporan_kemajuan: "",
      todo: "",
      next_bimbingan: undefined,
      status: false,
      berkas: [],
    },
    resolver: zodResolver(AddLogBimbinganFormSchema),
  });

  const apiFunction =
    strata === "S1" ? postLogBimbingan : postLogBimbinganForS2;

  const { trigger } = useSWRMutation(
    "/mahasiswa/add-bimbingan-log",
    async (_, { arg }: { arg: PostLogBimbinganReqData }) => {
      return await apiFunction(arg);
    },
  );

  const onSubmit = async (values: AddLogBimbinganFormData) => {
    const data: PostLogBimbinganReqData = {
      id_mahasiswa: idMahasiswa,
      date: values.date,
      laporan_kemajuan: values.laporan_kemajuan,
      todo: values.todo,
      next_bimbingan: values.next_bimbingan || undefined,
      status: false,
      berkas: values.berkas || [],
    };

    const toastParams: ToastParams = {
      loadingText: "Menyimpan log bimbingan...",
      successText: "Berhasil menyimpan log bimbingan",
      errorText: "Gagal menyimpan log bimbingan",
      action: () => trigger(data),
      beforeSuccess: () => {
        setTimeout(() => navigate("/log/bimbingan"), 1000);
      },
    };

    await makeToast(toastParams);
  };

  return {
    form,
    onSubmit,
  };
};

export default useAddLogBimbigan;
