import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { putAccount } from "../../clients";
import { PutAccountRequestData } from "../../types";
import { roleAccess } from "../constants/roleAccess";

export default function useAkunCreate() {
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

  const { trigger, error } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await trigger({
      nama: values.name,
      email: values.email,
      access: values.access.map((item) => item.name),
    });

    if (error) {
      // TODO: Add toast
      console.error(error);
    } else {
      navigate("/manajemen/kelola-akun");
    }
  };

  return { form, handleSubmit, roleAccess };
}
