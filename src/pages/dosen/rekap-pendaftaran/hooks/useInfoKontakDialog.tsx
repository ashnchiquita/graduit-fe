import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useInfoKontakDialog(infoKontakInit: string) {
  const [kontakDialogOpen, setKontakDialogOpen] = useState(false);

  const FormSchema = z.object({
    infoKontak: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      infoKontak: infoKontakInit,
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setKontakDialogOpen(false);
  };

  return { form, handleSubmit, kontakDialogOpen, setKontakDialogOpen };
}
