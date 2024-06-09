import useWindowSize from "@/hooks/useWindowSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dospeng, DospengModalHookRet, FormSchemaDospeng } from "../type";

export default function useDospengModal(
  dospeng: Dospeng[] | null,
  onChange: (date: Dospeng[]) => void,
): DospengModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [width] = useWindowSize();
  const handleChange = (data: z.infer<typeof FormSchemaDospeng>) => {
    onChange(data.dospeng);
    setDialogOpen(!dialogOpen);
  };

  const form = useForm<z.infer<typeof FormSchemaDospeng>>({
    resolver: zodResolver(FormSchemaDospeng),
    defaultValues: {
      dospeng: dospeng!.map((d) => ({ id: d.id, nama: d.nama })),
    },
  });

  useEffect(() => {
    form.setValue(
      "dospeng",
      dospeng!.map((d) => ({ id: d.id, nama: d.nama })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dospeng]);

  return {
    dialogOpen,
    setDialogOpen,
    form,
    isMobile: width < 1024,
    handleChange,
  };
}
