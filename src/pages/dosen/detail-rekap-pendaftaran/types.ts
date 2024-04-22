export type RegistrationRecapData = {
  id: string;
  name: string;
  apply_date: Date;
  email: string;
  stream: string;
  topic: string;
  description: string;
  interview_date: Date | null;
  status: string;
};

export type GetPendaftaranRes = {
  id: string;
  jalurPilihan: string;
  waktuPengiriman: string;
  jadwalInterview: string;
  status: string;
  judulTopik: string;
  deskripsiTopik: string;
  dosenPembimbing: {
    id: string;
    nama: string;
    kontak: string;
  }[];
};

export type MhsDataRes = {
  id: string;
  nama: string;
  email: string;
  nim: string;
  roles: string[];
  kontak: string;
};

export type ApprovalHookRet = {
  handleApprove: () => void;
  handleReject: () => void;
};

export type ApprovalHookProps = {
  id: string;
};
