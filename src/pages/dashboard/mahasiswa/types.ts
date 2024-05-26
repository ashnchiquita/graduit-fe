export type DashboardMahasiswaHookRet = {
  notification: GetNotificationRes;
  isRegisteredSemPro: boolean;
  isRegisteredSidang: boolean;
};

export type StatusMahasiswaResponse = {
  id_mahasiswa: string;
  nama: string;
  nim: string;

  status_pendaftaran: StatusPendaftaranResponse;
  status_bimbingan?: StatusBimbinganResponse;
  status_seminar?: StatusSeminarResponse;
  status_sidang?: StatusSidangResponse;
};

type StatusPendaftaranResponse = {
  status: boolean;
  topik: string;
  judul: string;
  dosen_pembimbing: string;
  pengiriman_registrasi: Date;
  persetujuan_dosen_pembimbing: Date | null;
  jadwal_interview: Date | null;
  pengesahan_dosen_pembimbing: boolean;
};

type StatusBimbinganResponse = {
  jumlah_bimbingan: number;
};

type StatusSeminarResponse = {
  status: boolean;
  dosen_penguji: string;
  jadwal_seminar: Date;
  ruangan: string;
};

type StatusSidangResponse = {
  status: boolean;
  dosen_penguji_1: string;
  dosen_penguji_2: string;
  jadwal_seminar: Date;
  ruangan: string;
};

export type GetNotificationRes = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  penggunaId: string;
}[];

export type GetSidsemS2RespData = {
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
