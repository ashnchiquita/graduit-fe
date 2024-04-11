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
  periode: string;
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
