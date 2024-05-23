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
  judulTopik?: string;
  idTopik?: string;
  deskripsiTopik?: string;
  jalurPilihan: string;
};

export type PostRegistrasiTesisResponseData = {};

export type StatusS2Response = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: string;
  jadwalInterview?: string | null;
  waktuKeputusan?: string | null;
  status: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: {
    id: string;
    nama: string;
    email: string;
  }[];
}[];

export type PostRegistrasiTARequestData = {
  idMahasiswa: string;
  idTopik: string;
  idPenerima: string;
};

export type StatusS1Response = {
  id: string;
  status: string;
  interviewAt: string;
  decidedAt: string;
  waktuPengiriman: string;
  judul: string;
  deskripsi: string;
  idDosen: string;
  namaDosen: string;
  emailDosen: string;

}[];
