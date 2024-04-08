import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type WawancaraModalProps = {
  dateInit: Date | null;
  onChange: (date: Date) => void;
  modalTrigger: JSX.Element;
};

export type WawancaraModalHookRet = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (data: z.infer<typeof FormSchema>) => void;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  isMobile: boolean;
};

export const FormSchema = z.object({
  jadwalWawan: z.date({
    required_error: "Jadwal wawancara harus diisi",
  }),
});
