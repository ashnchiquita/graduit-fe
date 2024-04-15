export type DetailPengajuanSidang = {
  nama: string;
  email: string;
  stream: string;
  topik: string;
  deskripsi: string;
  dosen_pembimbing: string;
  dosen_penguji: string[];
  jenis_sidang: string;
  jadwal_sidang?: Date;
  ruangan_sidang?: string;
};
