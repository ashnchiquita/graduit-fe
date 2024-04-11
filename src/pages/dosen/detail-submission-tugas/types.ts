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
