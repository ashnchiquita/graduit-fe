import s2Instance from "@/config/s2-axios-config";
import { DataKelas, GetMataKuliahRes } from "./types";
import { RoleEnum } from "@/types/session-data";

export async function getDaftarKelas(view: RoleEnum, search: string) {
  return await s2Instance.get<DataKelas[]>(`/kelas`, {
    params: {
      view,
      search,
    },
    withCredentials: true,
  });
}

export async function getDaftarMataKuliah() {
  return await s2Instance.get<GetMataKuliahRes>(`/kelas/mata-kuliah`, {
    withCredentials: true,
  });
}

export async function addKelas(
  mataKuliahKode: string,
  nomor: number | undefined | null,
) {
  return await s2Instance.post(`/kelas`, {
    mataKuliahKode,
    nomor,
  });
}
