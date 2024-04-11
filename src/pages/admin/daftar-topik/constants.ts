import { z } from "zod";

export const UpsertTopikFormSchema = z.object({
  judul: z.string().min(1, "Judul tidak boleh diisi kosong"),
  deskripsi: z.string().min(1, "Deskripsi topik tidak boleh diisi kosong"),
  idPengaju: z.string().min(1, "Harus memilih dosen pengaju topik"),
});

export type UpsertTopikFormData = z.infer<typeof UpsertTopikFormSchema>;
