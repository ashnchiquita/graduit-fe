export type KelasPengguna = {
  id: string;
  email: string;
  nama: string;
  kelas: {
    id: string;
    nomor: number;
    mataKuliahKode: string;
    mataKuliahNama: string;
  }[];
};

export type GetKelasMhsRes = {
  id: string;
  nama: string;
  email: string;
  kelas: {
    id: string;
    nomor: number;
    mataKuliahKode: string;
    mataKuliahNama: string;
  }[];
}[];

export type GetKelasDosenRes = {
  id: string;
  nama: string;
  email: string;
  kelas: {
    id: string;
    nomor: number;
    mataKuliahKode: string;
    mataKuliahNama: string;
  }[];
}[];

export type GetDaftarKelasRes = {
  id: string;
  nomor: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  jumlah_mahasiswa: number;
  warna: string;
}[];
