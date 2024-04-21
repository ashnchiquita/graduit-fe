import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { getAccount, putAccount } from "../../clients";
import { PutAccountRequestData } from "../../types";
import { RoleEnum } from "@/types/session-data";

interface ReturnType {
  form: UseFormReturn<
    {
      email: string;
      name: string;
      access: string[];
    },
    any,
    undefined
  >;
  handleSubmit: (values: {
    email: string;
    name: string;
    access: string[];
  }) => Promise<void>;
  roleAccess: string[];
  initialDataReady: boolean;
}

export default function useAkunDetail(): ReturnType {
  const navigate = useNavigate();
  const { id } = useParams();

  const roleAccess = Object.values(RoleEnum) as string[];

  const { data: initialData, isLoading: isInitialDataLoading } =
    useSWRImmutable(`/akun/${id}`, async () => {
      const res = await getAccount(id ?? "");
      return res.data;
    });

  useEffect(() => {
    if (initialData !== undefined)
      form.reset({
        access: initialData.roles.map((v: string) =>
          roleAccess.find((y) => y === v),
        ),
        email: initialData.email,
        name: initialData.nama,
      });
  }, [initialData]);

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    access: z.string().array(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      access: [],
    },
  });

  const { trigger, error } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    await trigger({
      nama: values.name,
      email: values.email,
      access: values.access,
      id: id ?? "",
    });

    if (error) {
      // TODO: Add toast
      console.error(error);
    } else {
      navigate("/manajemen/kelola-akun");
    }
  };

  return {
    form,
    handleSubmit,
    roleAccess,
    initialDataReady: !isInitialDataLoading,
  };
}
