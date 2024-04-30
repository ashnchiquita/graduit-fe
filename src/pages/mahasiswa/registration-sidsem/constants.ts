import { z } from "zod";

export const RegistrationSidSemFormSchema = z.object({
  tipe: z.string(),
  judul_proposal: z.string().min(1, "Judul Proposal tidak boleh kosong"),
  deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
  berkas: z.array(
    z.object({
      nama: z.string(),
      link: z.string(),
    }),
  ),
});

export type RegistrationSidSemFormData = z.infer<
  typeof RegistrationSidSemFormSchema
>;
