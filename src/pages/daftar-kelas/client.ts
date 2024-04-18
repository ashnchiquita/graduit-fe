import s2Instance from "@/config/s2-axios-config";
import { DataKelas } from "./types";
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
