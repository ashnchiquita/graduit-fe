import { SidangEnum } from "@/types/jenis-sidang";

export type PengajuanSidang = {
  id: string;
  nim: string;
  nama: string;
  jadwal_sidang?: Date;
  jenis_sidang: SidangEnum;
  ruangan?: string;
};

export const SidangDropdownOptions = ["Semua", "Sidang", "Seminar"];

export const MahasiswaDropdownOptions = [
  "Semua Mahasiswa",
  "Mahasiswa S1",
  "Mahasiswa S2",
];
