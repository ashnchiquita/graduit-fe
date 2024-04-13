import { z } from "zod";

export const tanggalBimbinganTitle = "Tanggal Bimbingan";
export const tanggalBimbinganDesc =
  "Pilih tanggal dilaksanakannya bimbingan ini.";
export const rencanaBimbinganTitle = "Rencana Bimbingan Selanjutnya";
export const rencanaBimbinganDesc = "Rencanakan tanggal bimbingan selanjutnya.";
export const laporanKemajuanTitle = "Laporan Kemajuan";
export const laporanKemajuanDesc =
  "Tuliskan kemajuan progres pengerjaan Tugas Akhir Anda.";
export const todoTitle = "To-do";
export const todoDesc = "Tuliskan hal-hal yang harus Anda lakukan selanjutnya";

export const AddLogBimbinganFormSchema = z.object({
  date: z.string().min(1, "Tanggal bimbingan tidak boleh kosong"),
  laporan_kemajuan: z.string().min(1, "Laporan kemajuan tidak boleh kosong"),
  todo: z.string().min(1, "To-do tidak boleh kosong"),
  next_bimbingan: z.string().optional(),
  status: z.boolean(),
  berkas: z
    .array(
      z.object({
        nama: z.string(),
        link: z.string(),
      }),
    )
    .optional(),
});

export type AddLogBimbinganFormData = z.infer<typeof AddLogBimbinganFormSchema>;
