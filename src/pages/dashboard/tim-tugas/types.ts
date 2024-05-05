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
  nim: string;
  nama: string;
  pengajuanTopik: boolean;
  seminarProposal: boolean;
  seminarTesis: boolean;
  sidang: boolean;
};
