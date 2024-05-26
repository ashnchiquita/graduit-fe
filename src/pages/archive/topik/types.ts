import { RoleEnum } from "@/types/session-data";

export type Topic = {
  id: string;
  lect_name: string;
  title: string;
  description: string;
  period: string;
};

export type GetTopics = {
  page?: number;
  limit?: number;
  search?: string;
  idPembimbing?: string;
};

export type GetTopicResponse = {
  sucess: boolean;
  code: number;
  message: string;
  data: {
    period: string;
    id: string;
    id_lecturer: string;
    lect_name: string;
    title: string;
    description: string;
  }[];
};

export type GetDosenResponse = {
  id: string;
  nama: string;
}[];

export type PostNewTopicReqData = {
  judul: string;
  deskripsi: string;
  idPengaju: string;
};

export type PostNewTopicBulkReqData = {
  data: PostNewTopicReqData[];
};

// remove later
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
