import { NavigateFunction } from "react-router-dom";

export type GetDetailS2Res = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: string;
  jadwalInterview: string;
  status: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: {
    id: string;
    nama: string;
    kontak: string;
  }[];
};

export type MhsDetail = {
  id: string;
  name: string;
  apply_date: Date;
  email: string;
  stream: string;
  topic: string;
  description: string;
  pembimbing: string[];
};

export type DetailMahasiswaHookRet = {
  data: MhsDetail;
  navigate: NavigateFunction;
};
