import { useState } from "react";
import { FormSchema, WawancaraModalHookRet } from "../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useWindowSize from "@/hooks/useWindowSize";

export default function useWawancaraModal(
  dateInit: Date | null,
  onChange: (date: Date) => void,
): WawancaraModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [width] = useWindowSize();

  const handleChange = (data: z.infer<typeof FormSchema>) => {
    onChange(data.jadwalWawan);

    setDialogOpen(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jadwalWawan: dateInit ?? undefined,
    },
  });

  return {
    dialogOpen,
    setDialogOpen,
    handleChange,
    form,
    isMobile: width < 1024,
  };
}
