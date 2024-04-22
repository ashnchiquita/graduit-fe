import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

export type Mahasiswa = {
  id: string;
  nim: string;
  nama: string;
  jadwalWawancara: Date | null;
  status: StatusPendaftaranEnum;
  strata: "S1" | "S2";
};

type StatisticItem = {
  amount: number;
  percentage: number;
};

export type RegStatistic = {
  diterima: StatisticItem;
  sedang_proses: StatisticItem;
  ditolak: StatisticItem;
};

export type RekapPendaftaranDosbimHookRet = {
  table: Table<Mahasiswa>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
  statistic: RegStatistic;
  infoKontak: string | null;
  isLoading: boolean;
};

export type RowActionHookRet = {
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (nim: string) => void;
  handleReject: (nim: string) => void;
};

export type GetRegMhsS2Res = {
  data: {
    pendaftaran_id: string;
    nim: string;
    mahasiswa_nama: string;
    mahasiswa_id: string;
    pembimbing_nama: string;
    status: string;
    jadwal_interview: string;
  }[];
  count: number;
};

export type SelfDataRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
  roles: string[];
  kontak: string;
};
