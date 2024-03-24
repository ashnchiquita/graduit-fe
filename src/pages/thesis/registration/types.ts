export type GetAllDosenPembimbingRespData = {
  id: string;
  nama: string;
  email: string;
}[];

export type GetAlokasiTopikPerPembimbingReqParams = {
  idPembimbing: string;
};

export type GetAlokasiTopikPerPembimbingRespData = {
  maxPage: number;
  data: {
    id: string;
    judul: string;
    deskripsi: string;
    pengaju: {
      id: string;
      nama: string;
      email: string;
      roles: string[];
    };
  }[];
};

export type PostRegistrasiTesisRequestData = {
  idMahasiswa: string;
  idPenerima: string;
  judulTopik: string;
  deskripsi: string;
  jalurPilihan: string;
};

export type PostRegistrasiTesisResponseData = {};
