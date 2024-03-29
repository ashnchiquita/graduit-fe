import s2Instance from "@/config/s2-axios-config";
import { GetLogBimbinganS2Res } from "./types";

export async function getLogBimbinganS2(id: string) {
  return await s2Instance.get<GetLogBimbinganS2Res>(`/bimbingan/${id}`, {
    withCredentials: true,
  });
}
