import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

export type Pengajuan = {
  id: string;
  jadwalInterview?: Date;
  jalurPilihan: string;
  status: StatusPendaftaranEnum;
  waktuPengiriman: Date;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: {
    id: string;
    nama: string;
  }[];
};

export type PengajuanS1Response = {
  success: boolean;
  code: number;
  message: string;
  data: Pengajuan[];
};

export type RiwayatPendaftaranData = {
  nim: string;
  nama: string;
  email: string;
  listPengajuan: Pengajuan[];
};

export type RiwayatPendaftaranHookRet = {
  dataMahasiswa: GetAccountMahasiswaRes;
  listPengajuan: Pengajuan[];
  wawancaraDialogOpen: boolean;
  setWawancaraDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ubahStatusDialogOpen: boolean;
  setUbahStatusDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ubahDosenPembimbingDialogOpen: boolean;
  setUbahDosenPembimbingDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  refreshData: () => void;
};

export type GetAccountMahasiswaRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
};

export type AllDosbingResp = {
  success: boolean;
  code: number;
  message: string;
  data: GetAllDosenPembimbingRespData;
};

export type GetAllDosenPembimbingRespData = {
  id: string;
  nama: string;
  email: string;
}[];

export type SelfDataRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
  roles: string[];
  kontak: string;
};
