import { Table } from "@tanstack/react-table";

export type BimbinganLogs = {
  tanggal: string;
  laporan_kemajuan: string;
  todo: string;
  rencana: string;
  berkas: string[];
  status: boolean;
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
  waktuBimbingan: string;
  laporanKemajuan: string;
  todo: string;
  bimbinganBerikutnya: string;
  berkasLinks: string[];
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
