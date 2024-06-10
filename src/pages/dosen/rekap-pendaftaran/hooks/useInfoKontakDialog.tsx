import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { updateInfoKontak } from "../clients";

export default function useInfoKontakDialog(infoKontakInit: string) {
  const [kontakDialogOpen, setKontakDialogOpen] = useState(!infoKontakInit);

  const FormSchema = z.object({
    infoKontak: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      infoKontak: infoKontakInit,
    },
  });

  const { trigger: triggerKontakUpdate } = useSWRMutation(
    "/self/kontak",
    async (_, { arg }: { arg: string }) => await updateInfoKontak(arg),
  );

  const handleSubmit = async (
    data: z.infer<typeof FormSchema>,
  ): Promise<void> => {
    const toastId = toast.loading("Menyimpan informasi kontak...");
    try {
      await triggerKontakUpdate(data.infoKontak);
      toast.update(toastId, {
        render: "Berhasil menyimpan informasi kontak",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setKontakDialogOpen(false);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menyimpan informasi kontak",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return { form, handleSubmit, kontakDialogOpen, setKontakDialogOpen };
}
