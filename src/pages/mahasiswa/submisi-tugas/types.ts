import { z } from "zod";

const BerkasSchema = z.object({
  nama: z.string().min(1, "Nama berkas tidak boleh kosong"),
  url: z.string().min(1, "URL berkas tidak boleh kosong").url(),
});

export const SubmitTugasFormSchema = z.object({
  jawaban: z.string().min(1, "Jawaban tidak boleh kosong"),
  berkas: z.array(BerkasSchema).default([]),
});

export type SubmitTugasFormData = z.infer<typeof SubmitTugasFormSchema>;

export type TugasDetail = {
  judul: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  deskripsi: string;
  berkasTugas: {
    nama: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  namaPembuat: string;
  namaPengubah: string;
  matakuliah: string;
};

export const TugasDetailData: TugasDetail = {
  judul: "Tugas 1",
  waktuMulai: new Date(),
  waktuSelesai: new Date(),
  deskripsi:
    "Lorem ipsum deskripsi tugas. Perhatikan hanya satu orang saja yang perlu mengumpul (NIM terkecil) supaya memudahkan asisten untuk memeriksa dan mendokumentasi. Jika dalam bentuk file, jawablah dengan tautan atau link tugas.",
  berkasTugas: [
    {
      nama: "Tugas 1",
      url: "https://google.com",
    },
    {
      nama: "Tugas 2",
      url: "https://google.com",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  namaPembuat: "John Doe",
  namaPengubah: "John Doe",
  matakuliah: "IF3021 Pemrograman Web",
};
