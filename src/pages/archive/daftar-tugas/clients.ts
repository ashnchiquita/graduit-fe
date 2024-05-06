import s2Instance from "@/config/s2-axios-config";
import { DataTugas } from "./types";

export async function getDaftarTugas() {
  return await s2Instance.get<DataTugas[]>(`/tugas/-/daftar-tugas`, {
    withCredentials: true,
  });
}
