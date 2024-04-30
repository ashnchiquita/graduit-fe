import { Table } from "@tanstack/react-table";

export type BimbinganLogs = {
  id: string;
  tanggal: string;
  laporan_kemajuan: string;
  todo: string;
  rencana: string;
  berkas: Berkas[];
  status: boolean;
};

export type Berkas = {
  nama: string;
  link: string;
};

export type BimbinganData = {
  bimbingan: BimbinganLogs[];
  mahasiswa: MahasiswaData;
  topik: {
    judul: string;
    deskripsi: string;
  };
};

export type MahasiswaData = {
  name: string;
  email: string;
  major: string;
};

export type BimbinganS2Res = {
  id: string;
  waktuBimbingan: Date;
  laporanKemajuan: string;
  todo: string;
  bimbinganBerikutnya: string;
  berkas: Berkas[];
};

export type BimbinganS1Res = {
  id: string;
  date: Date;
  laporan_kemajuan: string;
  todo: string;
  next_bimbingan: string;
  berkas: Berkas[];
  status: boolean;
};

export type GetLogBimbinganS1Res = {
  data: BimbinganS1Res[];
};

export type GetMahasiswaInfoS1Res = {
  data: {
    id: string;
    nama: string;
    email: string;
    nim: string;
    jalur_pilihan: string;
    judul: string;
    deskripsi: string;
  };
};

export type UpdateStatusBimbinganLogRes = {
  data: {
    success: string;
  };
};

export type GetLogBimbinganS2Res = {
  bimbingan: BimbinganS2Res[];
  mahasiswa: {
    id: string;
    nama: string;
    email: string;
    nim: string;
    jalurPilihan: string;
  };
  topik: {
    id: string;
    judul: string;
    deskripsi: string;
    idPengaju: string;
    periode: string;
  };
};

export type LogBimbinganMahasiswaHookRet = {
  table: Table<BimbinganLogs>;
  mahasiswaData: MahasiswaData;
  topik: {
    judul: string;
    deskripsi: string;
  };
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
};
