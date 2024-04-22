import s2Instance from "@/config/s2-axios-config";
import { GetPendaftaranRes, MhsDataRes } from "./types";
import loginInstance from "@/config/login-axios-config";

export async function getRegS2(mhsId: string) {
  return await s2Instance.get<GetPendaftaranRes>(
    `/registrasi-tesis/mahasiswa/${mhsId}/newest`,
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

export async function updateStatusS2(mhsId: string, status: string) {
  return await s2Instance.patch(`/registrasi-tesis/${mhsId}/status`, {
    status,
  });
}
