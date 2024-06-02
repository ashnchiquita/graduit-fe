export type Placeholders = {
  name: string;
  nim: string;
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
  id: string;
  jadwalInterview: string;
  jalurPilihan: string;
  status: string;
  waktuPengiriman: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: [
    {
      id: string;
      nama: string;
      kontakWhatsApp: string;
      kontakMsTeams: string;
      kontakEmail: string;
      kontakTelp: string;
      kontakLainnya: string;
    },
  ];
}[];

export type PostRegistraionSidSemReqDataS2 = {
  tipe: string;
  judulSidsem: string;
  deskripsiSidsem: string;
  berkasSidsem: {
    nama: string;
    url: string;
  }[];
};
