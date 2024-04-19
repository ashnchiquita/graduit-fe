export type KelasPengguna = {
  id: string;
  email: string;
  nama: string;
  kelas: {
    nomor: number;
    mataKuliahKode: string;
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
  }[];
}[];
