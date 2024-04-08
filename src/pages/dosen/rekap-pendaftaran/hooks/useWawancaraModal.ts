import { useState } from "react";
import { FormSchema, Mahasiswa, WawancaraModalHookRet } from "../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useWawancaraModal(
  dateInit: Date | null,
  setData: React.Dispatch<React.SetStateAction<Mahasiswa[]>>,
  nim: string,
): WawancaraModalHookRet {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (data: z.infer<typeof FormSchema>) => {
    setData((prev) =>
      prev.map((mhs) =>
        mhs.nim === nim ? { ...mhs, jadwalWawancara: data.jadwalWawan } : mhs,
      ),
    );
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
  };
}
