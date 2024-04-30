import { Table } from "@tanstack/react-table";

export type DashboardTimTugasProps = {
  strata: "S1" | "S2";
};

export type DashboardTimTugasHookProps = {
  strata: "S1" | "S2";
};

export type DashboardTimTugasHookRet = {
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  table: Table<DashTableData>;
};

export type DashTableData = {
  nim: string;
  nama: string;
  pengajuanTopik: boolean;
  seminarProposal: boolean;
  seminarTesis: boolean;
  sidang: boolean;
};
