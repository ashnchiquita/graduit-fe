import { Table } from "@tanstack/react-table";

export type DashboardTimTugasProps = {
  strata: "S1" | "S2" | "ALL";
};

export type DashboardTimTugasHookProps = {
  strata: "S1" | "S2" | "ALL";
};

export type DashboardTimTugasHookRet = {
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  table: Table<DashTableData>;
  strataFilter: "S1" | "S2";
  setStrataFilter: React.Dispatch<React.SetStateAction<"S1" | "S2">>;
};

export type DashTableData = {
  id: string;
  nim: string;
  nama: string;
  pengajuanTopik: boolean;
  seminarProposal: boolean;
  seminarTesis: boolean;
  sidang: boolean;
};

export enum GetDashboardTimTesisStatusEnum {
  PENGAJUAN_TOPIK = "PENGAJUAN_TOPIK",
  SEMINAR_1 = "SEMINAR_1",
  SEMINAR_2 = "SEMINAR_2",
  SIDANG = "SIDANG",
}

export type GetDashboardTimTesisRespData = {
  maxPage: 0;
  data: {
    id_mahasiswa: string;
    nim_mahasiswa: string;
    nama_mahasiswa: string;
    dosen_pembimbing: string[];
    status: GetDashboardTimTesisStatusEnum[];
  }[];
};

export type GetDashboardTimTARespData = {
  data: {
    id: string;
    nim: string;
    nama: string;
    PengajuanTopik: boolean;
    SeminarProposal: boolean;
    Sidang: boolean
  }[];
};

export type GetDashboardTimTesisReqParams = {
  page: number;
  limit: number;
  search?: string;
};


export type GetDashboardTimTAReqParams = {
  offset: number;
  limit: number;
};
