import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

export type Mahasiswa = {
  nim: string;
  nama: string;
  jadwalWawancara: Date | null;
  status: StatusPendaftaranEnum;
};

export type RekapPendaftaranDosbimHookRet = {
  table: Table<Mahasiswa>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
};

export type RowActionHookRet = {
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (nim: string) => void;
  handleReject: (nim: string) => void;
};
