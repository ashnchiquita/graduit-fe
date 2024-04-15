import { Table } from "@tanstack/react-table";
import { Berkas } from "../types";

export type SubmisiMahasiswa = {
  id: string;
  nim: string;
  nama: string;
  berkas: Berkas[];
  selesai: boolean;
};

export type SubmisiTugas = {
  tugas: string;
  deskripsiTugas: string;
  berkasTugas: Berkas[];
  namaMatkul: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  namaPembuat: string;
  waktuDibuat: Date;
  namaPengubah: string;
  waktuDiubah: Date;
  jawaban: string;
  mahasiswa: SubmisiMahasiswa[];
};

export type SubmissionTugasHookRet = {
  data: SubmisiTugas;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  table: Table<SubmisiMahasiswa>;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
  idTugas?: string;
};
