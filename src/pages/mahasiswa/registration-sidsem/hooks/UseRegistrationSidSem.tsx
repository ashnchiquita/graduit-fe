import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// import useSWR from "swr";
// import { useState } from "react";
import {
  RegistrationSidSemFormData,
  RegistrationSidSemFormSchema,
} from "../constants";
import { postRegistraionSidSemForS1 } from "../client";

const useRegistrationSidSem = () => {
  const { strata } = useParams();

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

  return {
    form,
    onSubmit,
  };
};

export default useRegistrationSidSem;
