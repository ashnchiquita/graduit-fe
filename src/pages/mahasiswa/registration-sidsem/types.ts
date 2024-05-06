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

export type GetDetailSidsemS2RespData = {
  idPengajuanSidsem: string;
  idMahasiswa: string;
  nimMahasiswa: string;
  namaMahasiswa: string;
  jadwalSidang: string | null;
  jenisSidang: "SEMINAR_1" | "SEMINAR_2" | "SIDANG";
  ruangan: string | null;
  status: "NOT_ASSIGNED" | "APPROVED" | "REJECTED";
  berkasSidsem: {
    id: string;
    nama: string;
    url: string;
  }[];
  emailMahasiswa: string;
  jalurPilihan: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: string[];
  dosenPenguji: string[];
  judulSidsem: string;
  deskripsiSidsem: string;
};

export type PostRegistraionSidSemReqDataS2 = {
  tipe: string;
  judulSidsem: string;
  deskripsiSidsem: string;
  berkasSidsem: {
    nama: string;
    url: string;
  }[];
};
