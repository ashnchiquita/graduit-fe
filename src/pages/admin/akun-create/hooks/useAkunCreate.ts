import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { putAccount } from "../../clients";
import { CreateAccountRequestData } from "../../types";
import { RoleEnum } from "@/types/session-data";
import useCustomToast, { ToastParams } from "@/hooks/useCustomToast";

export default function useAkunCreate() {
  const navigate = useNavigate();

  const roleAccess = Object.keys(RoleEnum)
    .filter((v) => isNaN(Number(v)))
    .map((role) => ({
      id: RoleEnum[role as keyof typeof RoleEnum],
      name: role,
    }));

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
    access: z
      .object({
        id: z.nativeEnum(RoleEnum),
        name: z.string(),
      })
      .array(),
    nim: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      access: [],
      nim: "",
    },
  });

  const { trigger } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: CreateAccountRequestData }) => {
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
          nim: values.nim,
          access: values.access.map((item) => item.id.toString()),
        }),
      afterError: (err) => {
        toastParams.errorText = err.response.data.message;
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
