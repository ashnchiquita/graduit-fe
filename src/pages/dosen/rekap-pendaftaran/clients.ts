import s2Instance from "@/config/s2-axios-config";
import { GetRegMhsS2Res, RegStatistic, SelfDataRes } from "./types";
import loginInstance from "@/config/login-axios-config";

export async function getRegMhsS2(search?: string) {
  return await s2Instance.get<GetRegMhsS2Res>("/registrasi-tesis", {
    params: {
      view: "S2_PEMBIMBING",
      search,
    },
  });
}

export async function getStatisticS2() {
  return await s2Instance.get<RegStatistic>("/registrasi-tesis/statistics", {
    params: {
      view: "S2_PEMBIMBING",
    },
  });
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

export async function getSelfData() {
  return await loginInstance.get<SelfDataRes>(`/auth/self`);
}

export async function updateInfoKontak(kontak: string) {
  return await loginInstance.patch(`/akun/kontak`, {
    kontak,
  });
}
