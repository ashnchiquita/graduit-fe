import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

export enum Status {
  Semua = 'Semua',
  Diterima = 'Diterima',
  Ditolak = 'Ditolak'
}

export enum Jenis {
  Semua = 'Semua',
  SeminarProposal = 'Seminar Proposal',
  SeminarTesis = 'Seminar Tesis',
  SidangTesis = 'Sidang Tesis'
}

export type ApprovalPendaftaranTopik = {
  id: string; // This is the pendaftaran_id
  nim: string;
  nama: string;
  tipe: string;
  dosenPembimbing: string;
  status: StatusPendaftaranEnum;
};

export type RekapPendaftaranTimTesisHookRet = {
  table: Table<ApprovalPendaftaranTopik>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  refreshData: () => void;
  status: Status;
  setStatus:  React.Dispatch<React.SetStateAction<Status>>;
  jenis: Jenis;
  setJenis: React.Dispatch<React.SetStateAction<Jenis>>;
};

export type RowActionHookRet = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (id: string) => void;
  handleReject: (id: string) => void;
};


export type ViewSelectStatusProps = {
  viewStatus: Status;
  setViewStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export type ViewSelectJenisProps = {
  viewJenis: Jenis;
  setViewJenis: React.Dispatch<React.SetStateAction<Jenis>>;
};


export type GetStatisticsRes = {
  diterima: {
    amount: number;
    percentage: number | null;
  };
  sedang_proses: {
    amount: number;
    percentage: number | null;
  };
  ditolak: {
    amount: number;
    percentage: number | null;
  };
};

export type GetRekapPendaftaranTableRes = {
  data: {
    pendaftaran_id: string;
    nim: string;
    mahasiswa_id: string;
    mahasiswa_nama: string;
    pembimbing_nama: string; // Dosen penerima (only 1)
    status: "NOT_ASSIGNED" | "INTERVIEW" | "APPROVED" | "REJECTED";
  }[];
  count: number;
};

export type GetAprrovalPendaftaranTableRes = {
  data: {
    pendaftaran_id: string;
    nim: string;
    mahasiswa_id: string;
    mahasiswa_nama: string;
    pembimbing_nama: string; // Dosen penerima (only 1)
    status: "NOT_ASSIGNED" | "INTERVIEW" | "APPROVED" | "REJECTED";
    tipe:
      | "NOT_ASSIGNED"
      | "Sidang Tesis"
      | "Seminar Proposal"
      | "Seminar Tesis";
  }[];
  count: number;
};

export type GetAprrovalPendaftaranTableResS1 = {
  data: {
    id: string;
    nim: string;
    id_mahasiswa: string;
    nama_mahasiswa: string;
    nama_dosbing: string; // Dosen penerima (only 1)
    status: boolean;
    tipe: string;
  }[];
};

export type ApproveRejectRes = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: Date;
  jadwalInterview: Date;
  waktuKeputusan: Date;
  status: "NOT_ASSIGNED" | "INTERVIEW" | "APPROVED" | "REJECTED";
};
