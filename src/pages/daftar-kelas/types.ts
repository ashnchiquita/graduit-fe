import { RoleEnum } from "@/types/session-data";

export type DataKelas = {
  id: string;
  nomor: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  jumlah_mahasiswa: number;
  warna: string;
};

export type DaftarKelasTimTesisData = DataKelas[];

export type GetDaftarKelasQuery = {
  view: RoleEnum;
  search?: string;
  kodeMatkul?: string;
};
