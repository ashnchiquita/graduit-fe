export type DetailSidSemResp = {
  data: {
    id_mahasiswa: string;
    nama: string;
    email: string;
    jalur_pilihan: string;
    judul: string;
    deskripsi: string;
    dosbing_name: string;
    tipe: string;
    waktu_mulai: string;
    nama_ruangan: string;
    ditolak: boolean | null;
  };
};

export type IsRegistered = {
  data: boolean;
};

export type DetailSidSemHookRet = {
  data: DetailSidSemResp;
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
  dosenPembimbing: DosbingDataRes[];
  dosenPenguji: string[];
  judulSidsem: string;
  deskripsiSidsem: string;
};

export type DosbingDataRes = {
  nama: string;
  email: string;
};
