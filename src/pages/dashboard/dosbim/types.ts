import { Table } from "@tanstack/react-table";

export type MahasiswaBimbingan = {
  id: string;
  nim: string;
  nama: string;
  topik: string;
  status: string;
  strata: "S1" | "S2";
};

export type StatusBimbingan = "lancar" | "terkendala" | "perlu bimbingan";

export type GetDashboardDosbimRes = {
  id: string;
  jalurPilihan: string;
  status: string;
  topik: {
    id: string;
    judul: string;
  };
  mahasiswa: {
    id: string;
    nama: string;
    nim: string;
  };
}[];

export type DashboardDosbimHookRet = {
  table: Table<MahasiswaBimbingan>;
  mahasiswaData: MahasiswaBimbingan[];
  doughnutChartData: DoughnutChartDosbing[];
};

export type GetDosbimStatisticsRes = {
  jalurPilihan: string;
  count: number;
}[];

type DoughnutChartDataItem = {
  type: string;
  amount: number;
};

export type DoughnutChartDosbing = {
  level: "S1" | "S2";
  data: DoughnutChartDataItem[];
};

export type BarChartDosbing = {
  level: "S1" | "S2";
  lancar: number;
  bimbingan: number;
  terkendala: number;
};
