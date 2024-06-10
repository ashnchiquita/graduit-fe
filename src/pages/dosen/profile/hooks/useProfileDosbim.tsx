import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";
import useSession from "@/hooks/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { patchDosbimProfile } from "../client";
import { SimpanKontakFormData, SimpanKontakFormSchema } from "../constants";
import { PatchDosbimProfileReqBody } from "../types";

const useProfileDosbim = () => {
  const { makeToast } = useCustomToast();
  const { data: sessionData } = useSession();

  const { trigger } = useSWRMutation(
    `/auth/self`,
    async (_, { arg }: { arg: PatchDosbimProfileReqBody }) => {
      await patchDosbimProfile(arg);
    },
  );

  const form = useForm<SimpanKontakFormData>({
    defaultValues: {
      whatsapp: "",
      msteams: "",
      email: "",
      telp: "",
    },
    resolver: zodResolver(SimpanKontakFormSchema),
  });

  useEffect(() => {
    console.log(sessionData);

    if (sessionData)
      form.reset({
        whatsapp: sessionData.kontakWhatsApp ?? "",
        msteams: sessionData.kontakMsTeams ?? "",
        email: sessionData.kontakEmail ?? "",
        telp: sessionData.kontakTelp ?? "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  const onSubmit = async (values: SimpanKontakFormData) => {
    const data: PatchDosbimProfileReqBody = {
      kontakEmail: values.email ?? "",
      kontakMsTeams: values.msteams ?? "",
      kontakTelp: values.telp ?? "",
      kontakWhatsApp: values.whatsapp ?? "",
    };

    const toastParams: ToastParams = {
      loadingText: "Menyimpan kontak...",
      successText: "Berhasil menyimpan kontak",
      errorText: "Gagal menyimpan kontak",
      action: () => trigger(data),
    };

    await makeToast(toastParams);
  };

  return {
    form,
    onSubmit,
  };
};

export default useProfileDosbim;
