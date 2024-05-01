export type Placeholders = {
  name: string;
  nim: string;
  program_studi: string;
  jalur_pilihan: string;
  topik: string;
  dosbing: string;
};

export type IDMahasiswa = {
  id: string;
};

export type BerkasSidSem = {
  nama: string;
  link: string;
};

export type postRegistraionSidSemDataS1 = {
  id_mahasiswa: string;
  tipe?: string;
  judul_proposal: string;
  deskripsi: string;
  berkas: BerkasSidSem[];
};
