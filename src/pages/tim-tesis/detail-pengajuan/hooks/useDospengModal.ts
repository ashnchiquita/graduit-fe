import useWindowSize from "@/hooks/useWindowSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dospeng, DospengModalHookRet, FormSchemaDospeng } from "../type";

export default function useDospengModal(
  dosbing: Dospeng[] | null,
): DospengModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [width] = useWindowSize();

  const form = useForm<z.infer<typeof FormSchemaDospeng>>({
    resolver: zodResolver(FormSchemaDospeng),
    defaultValues: {
      dosbings: dosbing?.map((d) => ({ id: d.id, nama: d.nama })),
    },
  });

  return {
    dialogOpen,
    setDialogOpen,
    form,
    isMobile: width < 1024,
  };
}
