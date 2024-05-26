import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { updateInfoKontak } from "../clients";
import { toast } from "react-toastify";

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

  const { trigger: triggerKontakUpdate, error: kontakUpdateError } =
    useSWRMutation(
      "/self/kontak",
      async (_, { arg }: { arg: string }) => await updateInfoKontak(arg),
    );

  const handleSubmit = async (
    data: z.infer<typeof FormSchema>,
  ): Promise<void> => {
    const toastId = toast.loading("Menyimpan informasi kontak...");
    await triggerKontakUpdate(data.infoKontak);

    if (kontakUpdateError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menyimpan informasi kontak",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menyimpan informasi kontak",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setKontakDialogOpen(false);
    }
  };

  return { form, handleSubmit, kontakDialogOpen, setKontakDialogOpen };
}
