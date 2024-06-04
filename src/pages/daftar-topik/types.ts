import { RoleEnum } from "@/types/session-data";

export type DaftarTopikData = {
  id: string;
  judul: string;
  deskripsi: string;
  pengaju: {
    id: string;
    nama: string;
    email: string;
    roles: RoleEnum[];
  };
};

export type GetAllTopicParams = {
  page?: number;
  limit?: number;
  search?: string;
  idPembimbing?: string;
};

export type GetAllTopicRespData = {
  data: DaftarTopikData[];
  maxPage: number;
};

export type PostNewTopicReqData = {
  judul: string;
  deskripsi: string;
  idPengaju: string;
};

export type PostNewTopicBulkReqData = {
  data: PostNewTopicReqData[];
};

export type PutExistingTopicReqData = {
  judul: string;
  deskripsi: string;
  idPengaju: string;
};

export type GetAllDosenPembimbingRespData = {
  id: string;
  nama: string;
  email: string;
}[];

export type LoadedExcelData = {
  Judul: string;
  Deskripsi: string;
  "Dosen Pengaju": string;
}[];
