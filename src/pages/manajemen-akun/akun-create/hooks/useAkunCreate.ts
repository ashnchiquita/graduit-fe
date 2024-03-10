import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/login-axios-config";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { roleAccess } from "../constants/roleAccess";
import { useNavigate } from "react-router-dom";

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
  }) => void;
  roleAccess: { id: number; name: string }[];
}

export default function useAkunCreate(): ReturnType {
  const navigate = useNavigate();

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
        nama: values.name,
        email: values.email,
        access: values.access.map((item) => item.name),
      });
      navigate("/manajemen/kelola-akun");
    } catch (err) {
      console.error(err);
    }
  };

  return { form, handleSubmit, roleAccess };
}
