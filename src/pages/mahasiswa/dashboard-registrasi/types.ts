export type DashboardRegistrasiHookRet = {
  data: StatusMahasiswaResponse;
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
