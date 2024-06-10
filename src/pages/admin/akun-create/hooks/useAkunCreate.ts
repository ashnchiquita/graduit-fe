import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { putAccount } from "../../clients";
import { PutAccountRequestData } from "../../types";
import { RoleEnum } from "@/types/session-data";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

export default function useAkunCreate() {
  const navigate = useNavigate();

  const roleAccess = Object.keys(RoleEnum)
    .filter((v) => isNaN(Number(v)))
    .map((role, idx) => ({
      id: idx,
      name: role,
    }));

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    access: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .array(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      access: [],
    },
  });

  const { trigger } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  const { makeToast } = useCustomToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastParams: ToastParams = {
      loadingText: "Membuat akun...",
      successText: "Berhasil membuat akun",
      errorText: "Gagal membuat akun",
      action: () =>
        trigger({
          nama: values.name,
          email: values.email,
          access: values.access.map((item) => item.name),
        }),
      afterError: (err) => {
        console.error(err);
      },
      beforeSuccess: () => {
        setTimeout(() => {
          navigate("/manajemen/kelola-akun");
        }, 1000);
      },
    };

    await makeToast(toastParams);
  };

  return { form, handleSubmit, roleAccess };
}
