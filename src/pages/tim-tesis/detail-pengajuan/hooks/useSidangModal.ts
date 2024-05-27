import useWindowSize from "@/hooks/useWindowSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchemaDate, SidangModalHookRet } from "../type";

export default function useSidangModal(
  dateInit: Date | null,
  onChange: (date: Date) => void,
): SidangModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [width] = useWindowSize();

  const handleChange = (data: z.infer<typeof FormSchemaDate>) => {
    console.log(data.jadwalSidang.getTime);
    onChange(data.jadwalSidang);

    setDialogOpen(false);
  };

  const form = useForm<z.infer<typeof FormSchemaDate>>({
    resolver: zodResolver(FormSchemaDate),
    defaultValues: {
      jadwalSidang: dateInit ?? new Date(),
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
