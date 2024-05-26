import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

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
    idPengajuanSidsem: string;
    idMahasiswa: string;
    nimMahasiswa: string;
    namaMahasiswa: string;
    jadwalSidang: string;
    jenisSidang: string;
    ruangan: string;
    status: string;
    dosenPembimbing: string[];
    berkasSidsem: {
      id: string;
      nama: string;
      url: string;
    }[];
  }[];
  total: number;
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
