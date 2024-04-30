import { z } from "zod";

export const RegistrationSidSemFormSchema = z.object({
  id_mahasiswa: z.string(),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  nim: z.string().min(1, "NIM tidak boleh kosong"),
  program_studi: z.string().min(1, "Program studi tidak boleh kosong"),
  jalur_pilihan: z.string().min(1, "Jalur pilihan tidak boleh kosong"),
  topik: z.string().min(1, "Topik tidak boleh kosong"),
  dosen_pembimbing: z.string().min(1, "Dosen pembimbing tidak boleh kosong"),
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
