import { z } from "zod";

export const RegistrationSidSemFormSchema = z.object({
  id_mahasiswa: z.string(),
  nama: z.string().optional(),
  nim: z.string().optional(),
  program_studi: z.string().optional(),
  jalur_pilihan: z.string().optional(),
  topik: z.string().optional(),
  dosen_pembimbing: z.string().optional(),
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
