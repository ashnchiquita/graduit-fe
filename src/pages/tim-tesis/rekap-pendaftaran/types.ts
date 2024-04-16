import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { Table } from "@tanstack/react-table";

export type PendaftaranTopik = {
  id: string; // This is the pendaftaran_id
  nim: string;
  nama: string;
  dosenPembimbing: string;
  status: StatusPendaftaranEnum;
};

export type RekapPendaftaranTimTesisHookRet = {
  table: Table<PendaftaranTopik>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
  statisticsData: GetStatisticsRes;
};

export type RowActionHookRet = {
  acceptDialogOpen: boolean;
  setAcceptDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rejectDialogOpen: boolean;
  setRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editDosenPembimbingDialogOpen: boolean;
  setEditDosenPembimbingDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  handleAccept: (id: string) => void;
  handleReject: (id: string) => void;
};

export type Pengajuan = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: Date;
  jadwalInterview?: Date;
  waktuKeputusan?: Date;
  status: StatusPendaftaranEnum;
  topik: {
    id: string;
    judul: string;
    deskripsi: string;
    idPengaju: string;
    periode: string;
  };
  penerima: {
    // Dosen pembimbing
    id: string;
    nama: string;
    email: string;
  };
};

export type RiwayatPendaftaranData = {
  nim: "13521149";
  nama: "Rava Maulana Azzikri";
  email: "13521149@std.stei.itb.ac.id";
  listPengajuan: Pengajuan[];
};

export type RiwayatPendaftaranHookRet = {
  data: RiwayatPendaftaranData;
  setData: React.Dispatch<React.SetStateAction<RiwayatPendaftaranData>>;
  wawancaraDialogOpen: boolean;
  setWawancaraDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ubahStatusDialogOpen: boolean;
  setUbahStatusDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ubahDosenPembimbingDialogOpen: boolean;
  setUbahDosenPembimbingDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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
    pembimbing_nama: string;
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
