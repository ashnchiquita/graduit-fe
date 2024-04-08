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
  data: {
    id: string;
    mahasiswa: {
      nama: string;
      email: string;
    };
    waktuPengiriman: string;
    jadwalInterview: string;
    jalurPilihan: string;
    topik: {
      judul: string;
      deskripsi: string;
    };
    status: string;
  }[];
};

export type ApprovalHookRet = {
  handleApprove: () => void;
  handleReject: () => void;
};

export type ApprovalHookProps = {
  id: string;
};
