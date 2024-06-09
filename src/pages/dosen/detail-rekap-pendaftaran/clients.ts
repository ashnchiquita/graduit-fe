import s2Instance from "@/config/s2-axios-config";
import { GetPendaftaranRes, GetPendaftaranResS1, MhsDataRes } from "./types";
import loginInstance from "@/config/login-axios-config";
import s1Instance from "@/config/s1-axios-config";

export async function getRegS2(mhsId: string) {
  return await s2Instance.get<GetPendaftaranRes>(
    `/registrasi-tesis/mahasiswa/${mhsId}/newest`,
  );
}

export async function getRegS1(mhsId: string) {
  return await s1Instance.get<GetPendaftaranResS1>(
    `/admin/detail-rekap-pendaftaran?id_mahasiswa=${mhsId}`,
    {
      withCredentials: true,
    },
  );
}

export async function getMhsData(mhsId: string) {
  return await loginInstance.get<MhsDataRes>(`/akun/${mhsId}`);
}

export async function updateInterviewS2(mhsId: string, date: Date) {
  return await s2Instance.patch(`/registrasi-tesis/${mhsId}/interview`, {
    date,
  });
}

export async function updateInterviewS1(mhsId: string, date: Date) {
  return await s1Instance.put(
    `/admin/update-interview`,
    {
      id_mahasiswa: mhsId,
      interview_at: date,
    },
    {
      withCredentials: true,
    },
  );
}

export async function updateStatusS2(mhsId: string, status: string) {
  return await s2Instance.patch(`/registrasi-tesis/${mhsId}/status`, {
    status,
  });
}

export async function updateStatusS1(mhsId: string, status: string) {
  return await s1Instance.put(
    `/admin/update-status`,
    {
      id_mahasiswa: mhsId,
      status: status,
    },
    {
      withCredentials: true,
    },
  );
}
