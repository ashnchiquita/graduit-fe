import s2Instance from "@/config/s2-axios-config";
import { GetPendaftaranRes } from "./types";

export async function getPendaftaran() {
  return await s2Instance.get<GetPendaftaranRes>(
    `/registrasi-tesis/?page=1&limit=10&sort=DESC&view=S2_PEMBIMBING`,
    {
      withCredentials: true,
    },
  );
}

export async function approvePendaftaran(id: string) {
  return await s2Instance.patch(`/approval/${id}/approve`, null, {
    withCredentials: true,
  });
}

export async function rejectPendaftaran(id: string) {
  return await s2Instance.patch(`/approval/${id}/reject`, null, {
    withCredentials: true,
  });
}
