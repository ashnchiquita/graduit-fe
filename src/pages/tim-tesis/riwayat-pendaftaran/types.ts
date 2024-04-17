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
    // Dosen pembimbing
    id: string;
    nama: string;
  };
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
};

export type GetAccountMahasiswaRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
};
