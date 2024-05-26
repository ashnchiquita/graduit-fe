import { z } from "zod";

export const SimpanKontakFormSchema = z.object({
  whatsapp: z.string().optional(),
  msteams: z.string().optional(),
  email: z.string().optional(),
  telp: z.string().optional(),
});

export type SimpanKontakFormData = z.infer<typeof SimpanKontakFormSchema>;
