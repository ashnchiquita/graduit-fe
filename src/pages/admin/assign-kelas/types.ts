export type KelasPengguna = {
  id: string;
  email: string;
  nama: string;
  kelas: {
    nomor: number;
    mataKuliahKode: string;
  }[];
};
