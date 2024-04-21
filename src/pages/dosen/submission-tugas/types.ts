import { Table } from "@tanstack/react-table";
import { Berkas } from "../types";

export type SubmisiMahasiswa = {
  id: string;
  nim: string;
  nama: string;
  idSubmisi: string;
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

export type GetListMhsRes = {
  id: string;
  nama: string;
  nim: string;
  submisiTugas: {
    id: string;
    isSubmitted: boolean;
    berkasSubmisiTugas: [
      {
        id: string;
        nama: string;
        url: string;
      },
    ];
  };
}[];

export type GetTugasRes = {
  id: string;
  judul: string;
  waktuMulai: string;
  waktuSelesai: string;
  deskripsi: string;
  berkasTugas: [
    {
      id: string;
      nama: string;
      url: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
  pembuat: {
    id: string;
    nama: string;
  };
  pengubah: {
    id: string;
    nama: string;
  };
  kelas: {
    id: string;
    nomor: number;
    mataKuliah: {
      kode: string;
      nama: string;
    };
  };
};
