export type StatusMahasiswaResponse = {
  status_pendaftaran: StatusPendaftaranResponse;
};

type StatusPendaftaranResponse = {
  status: boolean;
  topik: string;
  judul: string;
  dosen_pembimbing: string;
  pengiriman_registrasi: Date;
  persetujuan_dosen_pembimbing: Date | null;
  jadwal_interview: Date | null;
  pengesahan_dosen_pembimbing: boolean | null;
};

export type StatusMahasiswaHookRet = {
  data: StatusMahasiswaResponse[];
  title: PageTitle;
};

export enum PageTitle {
  STATUS_TUGAS_AKHIR = "Registrasi Tugas Akhir",
  STATUS_TESIS = "Registrasi Tesis",
}

export type StatusS2Response = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: string;
  jadwalInterview?: string | null;
  waktuKeputusan?: string | null;
  status: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: {
    id: string;
    nama: string;
    email: string;
  }[];
}[];
