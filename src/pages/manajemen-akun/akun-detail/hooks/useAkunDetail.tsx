import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { roleAccess } from "@/pages/manajemen-akun/akun-create/constants/roleAccess";
import { useEffect, useState } from "react";
import { Account } from "@/pages/manajemen-akun/kelola-akun/hooks/useKelolaAkun";
import axios from "@/config/login-axios-config";
import { useNavigate, useParams } from "react-router-dom";

interface ReturnType {
  form: UseFormReturn<
    {
      email: string;
      name: string;
      access: {
        name: string;
        id: number;
      }[];
    },
    any,
    undefined
  >;
  handleSubmit: (values: {
    email: string;
    name: string;
    access: {
      name: string;
      id: number;
    }[];
  }) => Promise<void>;
  roleAccess: { id: number; name: string }[];
  initialDataReady: boolean;
}

export default function useAkunDetail(): ReturnType {
  const [initialData, setInitialData] = useState<Account>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/akun/${id}`);
      setInitialData({
        id: res.data.id,
        email: res.data.email,
        name: res.data.nama,
        access: res.data.roles,
      });
      form.setValue("email", res.data.email);
      form.setValue("name", res.data.nama);
      form.setValue(
        "access",
        res.data.roles.map((v: string) => roleAccess.find((y) => y.name === v)),
      );
    })();
  }, []);

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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Add toast
    try {
      await axios.put("/akun", {
        id,
        nama: values.name,
        email: values.email,
        access: values.access.map((item) => item.name),
      });
      navigate("/manajemen/kelola-akun");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    form,
    handleSubmit,
    roleAccess,
    initialDataReady: initialData !== undefined,
  };
}
