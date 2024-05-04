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
    ditolak: boolean;
  };
};

export type IsRegistered = {
  data: boolean;
};

export type DetailSidSemHookRet = {
  data: DetailSidSemResp;
};
