import { Berkas } from "../types";

export type DetailSubmisi = {
  nama: string;
  email: string;
  nim: string;
  jalurPilihan: string;
  waktuSubmisi: Date;
  topik: string;
  deskripsiTopik: string;
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
  berkasJawaban: Berkas[];
};

export type DetailSubmissionTugasHookRet = {
  data: DetailSubmisi;
};

export type GetDetailSubmisiRes = {
  tugas: {
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
  pendaftaran: {
    id: string;
    nama: string;
    email: string;
    pendaftaranTesis: {
      id: string;
      jalurPilihan: string;
      waktuPengiriman: string;
      jadwalInterview: string;
      status: string;
      topik: {
        id: string;
        judul: string;
        deskripsi: string;
        pengaju: {
          id: string;
          nama: string;
          email: string;
          nim: string;
          roles: string[];
          kontak: string;
        };
        idPengaju: string;
        periode: string;
      };
    };
  };
  submisiTugas: {
    id: string;
    jawaban: string;
    isSubmitted: boolean;
    berkasSubmisiTugas: [
      {
        id: string;
        nama: string;
        url: string;
      },
    ];
    submittedAt: string;
  };
};
