import { boolean } from "zod";

export type Berkas = {
    nama: string;
    link: string;
  };

  export type LogBimbinganStatusData = {
    status: boolean;
    bimbingan_logs: LogBimbinganData[];
  }
  
  export type GetLogBimbinganStatusResData = {
    data:{
        status: boolean;
        bimbingan_logs: LogBimbinganData[];
    }
  }

  export type LogBimbinganData = {
    id: string;
    date: string;
    laporan_kemajuan: string;
    todo: string;
    next_bimbingan: string;
    berkas: Berkas[];
    status: boolean;
  };
