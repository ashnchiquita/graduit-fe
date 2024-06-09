import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { getAccount, putAccount } from "../../clients";
import { PutAccountRequestData } from "../../types";
import { RoleEnum } from "@/types/session-data";
import { toast } from "react-toastify";

interface ReturnType {
  form: UseFormReturn<{
    email: string;
    name: string;
    access: {
      name: string;
      id: number;
    }[];
    nim?: string;
  }>;
  handleSubmit: (values: {
    email: string;
    name: string;
    access: {
      name: string;
      id: number;
    }[];
    nim?: string;
  }) => Promise<void>;
  roleAccess: { id: number; name: string }[];
  initialDataReady: boolean;
}

export default function useAkunDetail(): ReturnType {
  const { id } = useParams();

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    access: z
      .object({
        id: z.number(),
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
      access: [],
      nim: undefined,
    },
  });

  const roleAccess = Object.keys(RoleEnum)
    .filter((v) => isNaN(Number(v)))
    .map((role, idx) => ({
      id: idx,
      name: role,
    }));

  const {
    data: initialData,
    isLoading: isInitialDataLoading,
    mutate,
  } = useSWRImmutable(`/akun/${id}`, async () => {
    const res = await getAccount(id ?? "");
    return res.data;
  });

  useEffect(() => {
    if (initialData !== undefined) {
      form.reset({
        access: initialData.roles.map((v: string) =>
          roleAccess.find((y) => y.name === v),
        ),
        email: initialData.email,
        name: initialData.nama,
        nim: initialData.nim,
      });
    }
  }, [initialData]);

  useEffect(() => {
    // Refetch the data when the component mounts
    mutate();
  }, [mutate]);

  const { trigger, error } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", values);
    await trigger({
      nama: values.name,
      email: values.email,
      access: values.access.map((item) => item.name),
      id: id ?? "",
    });

    if (error) {
      toast.error("Gagal menyimpan perubahan");
    } else {
      toast.success("Berhasil menyimpan perubahan");
      // Refetch the initial data to reflect the changes
      mutate();
    }
  };

  return {
    form,
    handleSubmit,
    roleAccess,
    initialDataReady: !isInitialDataLoading,
  };
}
