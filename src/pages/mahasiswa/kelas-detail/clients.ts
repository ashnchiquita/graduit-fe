import s2Instance from "@/config/s2-axios-config";
import { DataKelas, DataTugas } from "./types";
import { KelasDialogProps } from "./components/KelasDialog";

export async function getKelas(idKelas: string) {
  return await s2Instance.get<DataKelas>(`/kelas/${idKelas}`, {
    withCredentials: true,
  });
}

export async function getKelasDetail(idKelas: string) {
  return await s2Instance.get<KelasDialogProps>(`/kelas/${idKelas}/detail`, {
    withCredentials: true,
  });
}

export async function getDaftarTugas() {
  return await s2Instance.get<DataTugas[]>(`/tugas/-/daftar-tugas`, {
    withCredentials: true,
  });
}
