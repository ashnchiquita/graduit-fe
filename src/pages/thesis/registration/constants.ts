import { z } from "zod";

export const DUMMY_CHOICES = [
  "Ilmu Komputer (CS)",
  "Rekayasa Perangkat Lunak dan Inovasi (SEI)",
  "Sistem Informasi (SI)",
  "Teknologi Informasi (IT)",
  "Sistem Inteligensi (IntS)",
  "Teknologi Media dan Piranti Bergerak (MMT)",
  "Komputasi Cloud (CC)",
  "Sains Data dan Inteligensi Buatan (DS-AI)",
  "Keamanan Siber (CSec)",
];

export const DUMMY_DOSEN = [
  "Achmad Imam Kistijantoro, S.T., M.Sc, Ph.D.",
  "Ir. Afwarman, M.Sc., Ph.D.",
  "Dr. Eng. Ayu Purwarianti, S.T., M.T.",
  "Dessi Puji Lestari, ST., M.Eng., Ph.D.",
  "Dr. Fariska Zakhralativa Ruskanda, S.T., M.T.",
  "Dr. Judhi Santoso, M.Sc.",
  "Ir. Kridanto Surendro, M.Sc., Ph.D.",
  "Dr. Masayu Leylia Khodra, S.T., M.T.",
  "Dr. Nur Ulfa Maulidevi, S.T., M.Sc.",
];

export const thesisRegistrationFormSchema = z.object({
  // TODO adjust to API contract
  topic: z.string().min(1, "Topik tidak boleh diisi kosong"),
  topicDescription: z
    .string()
    .min(1, "Deskripsi topik tidak boleh diisi kosong"),
  stream: z.string().min(1, "Harus memilih jalur pilihan"),
  lecturer: z.string(),
});

export type thesisRegistrationFormData = z.infer<
  typeof thesisRegistrationFormSchema
>;
