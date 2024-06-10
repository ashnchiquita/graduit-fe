import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

export type PendaftaranTopik = {
  id: string; // This is the pendaftaran_id
  nim: string;
  nama: string;
  dosenPembimbing: string;
  status: StatusPendaftaranEnum;
  pendaftaranId: string;
};

export type RekapPendaftaranTimTesisHookRet = {
  table: Table<PendaftaranTopik>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  statisticsData: GetStatisticsRes;
  refreshData: () => void;
};

export type RowActionHookRet = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (id: string, pendaftaranId: string) => void;
  handleReject: (id: string, pendaftaranId: string) => void;
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

export type GetStatisticsResS1 = {
  data: {
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

export type ApproveRejectRes = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: Date;
  jadwalInterview: Date;
  waktuKeputusan: Date;
  status: "NOT_ASSIGNED" | "INTERVIEW" | "APPROVED" | "REJECTED";
};

export type SelfDataRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
  roles: string[];
  kontak: string;
};
