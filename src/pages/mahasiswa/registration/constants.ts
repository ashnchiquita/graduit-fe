import SelectData from "@/types/select-data";
import { z } from "zod";

export const StreamSelectOptions: SelectData[] = [
  { label: "Ilmu Komputer (CS)", value: "CS" },
  { label: "Rekayasa Perangkat Lunak dan Inovasi (SEI)", value: "SEI" },
  { label: "Sistem Informasi (SI)", value: "IS" },
  { label: "Teknologi Informasi (IT)", value: "IT" },
  { label: "Sistem Inteligensi (IntS)", value: "INTS" },
  { label: "Teknologi Media dan Piranti Bergerak (MMT)", value: "MMT" },
  { label: "Komputasi Cloud (CC)", value: "CC" },
  { label: "Sains Data dan Inteligensi Buatan (DS-AI)", value: "DSAI" },
  { label: "Keamanan Siber (CSec)", value: "CSEC" },
];

export const StreamSelectOptionsS1: SelectData[] = [
  { label: "Teknik Informatika", value: "Teknik Informatika" },
  {
    label: "Sistem Teknologi dan Informasi",
    value: "Sistem Teknologi dan Informasi",
  },
];

export const RegistrationFormSchema = z.object({
  // TODO adjust to API contract
  topic: z.string().min(1, "Topik tidak boleh diisi kosong"),
  topicDescription: z
    .string()
    .min(1, "Deskripsi topik tidak boleh diisi kosong"),
  stream: z.string().min(1, "Harus memilih jalur pilihan"),
  lecturer: z.string().min(1, "Harus memilih dosen pembimbing"),
});

export type RegistrationFormData = z.infer<typeof RegistrationFormSchema>;
