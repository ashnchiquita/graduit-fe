import s2Instance from "@/config/s2-axios-config";
import {
  AllDosbingResp,
  Pengajuan,
  PengajuanS1Response,
  SelfDataRes,
} from "./types";
import loginInstance from "@/config/login-axios-config";
import { GetAccountMahasiswaRes } from "./types";
import { GetAllDosenPembimbingRespData } from "./types";
import s1Instance from "@/config/s1-axios-config";

export async function getRiwayatPendaftaran(idMahasiswa: string) {
  return await s2Instance.get<Pengajuan[]>(
    `/registrasi-tesis/mahasiswa/${idMahasiswa}`,
    {
      withCredentials: true,
    },
  );
}

export async function getRiwayatPendaftaranS1(idMahasiswa: string) {
  return await s1Instance.get<PengajuanS1Response>(
    `/admin/riwayat-pendaftaran?id_mahasiswa=${idMahasiswa}`,
    {
      withCredentials: true,
    },
  );
}

export async function getAccount(id: string) {
  return await loginInstance.get<GetAccountMahasiswaRes>(`/akun/${id}`, {
    withCredentials: true,
  });
}

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan", {
    withCredentials: true,
  });
};

export const getAllDosenPembimbingS1 = () => {
  return s1Instance.get<AllDosbingResp>("/admin/all-dosbing", {
    withCredentials: true,
  });
};

export const updateDosenPembimbing = (
  id: string,
  dosenPembimbingIds: string[],
) => {
  return s2Instance.patch(`/registrasi-tesis/${id}/pembimbing`, {
    pembimbing_ids: dosenPembimbingIds,
  });
};

export const updateDosenPembimbingS1 = (
  idPendaftaran: string,
  dosenPembimbingIds: string[],
) => {
  return s1Instance.put(
    `/admin/update-dosbing`,
    {
      id_pendaftaran: idPendaftaran,
      pembimbing_ids: dosenPembimbingIds,
    },
    {
      withCredentials: true,
    },
  );
};

export const updateInterviewDate = (id: string, date: Date) => {
  return s2Instance.patch(`/registrasi-tesis/${id}/interview`, {
    date,
  });
};

export async function getSelfData() {
  return await loginInstance.get<SelfDataRes>(`/auth/self`);
}
