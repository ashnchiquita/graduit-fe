import useWindowSize from "@/hooks/useWindowSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchemaTempat, TempatModalHookRet } from "../type";

export default function useTempatModal(
  tempat: string | null,
  onChange: (tempat: string) => void,
): TempatModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [width] = useWindowSize();

  const handleChange = (data: z.infer<typeof FormSchemaTempat>) => {
    onChange(data.tempat);
    setDialogOpen(false);
  };
  const form = useForm<z.infer<typeof FormSchemaTempat>>({
    resolver: zodResolver(FormSchemaTempat),
    defaultValues: {
      tempat: tempat ?? undefined,
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
