export type Berkas = {
  nama: string;
  link: string;
};

export type PostLogBimbinganRespData = {
  success: boolean;
  code: number;
  message: string;
  data: object;
};

export type PostLogBimbinganReqData = {
  id_mahasiswa: string;
  date: Date;
  laporan_kemajuan: string;
  todo: string;
  next_bimbingan?: Date;
  status: boolean;
  berkas: Berkas[];
};

export type IDMahasiswa = {
  id: string;
};
