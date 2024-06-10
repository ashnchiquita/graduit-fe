export type Berkas = {
  nama: string;
  link: string;
};

export type LogBimbinganStatusData = {
  status: string;
  bimbingan_logs: LogBimbinganData[];
};

export type GetLogBimbinganStatusResData = {
  data: {
    status: boolean;
    bimbingan_logs: LogBimbinganData[];
  };
};

export type LogBimbinganData = {
  id: string;
  date: string;
  laporan_kemajuan: string;
  todo: string;
  next_bimbingan: string;
  berkas: Berkas[];
  status: boolean;
};

type BimbinganLogS2 = {
  id: string;
  waktuBimbingan: string;
  laporanKemajuan: string;
  todo: string;
  bimbinganBerikutnya: string | null;
  disahkan: boolean;
  berkas: {
    nama: string;
    url: string;
  }[];
};

export type GetBimbinganS2Res = {
  bimbingan: BimbinganLogS2[];
  status: string;
};
