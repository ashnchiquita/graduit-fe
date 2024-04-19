import s2Instance from "@/config/s2-axios-config";
import { GetKelasDosenRes, GetKelasMhsRes } from "./types";

export async function getKelasMhs() {
  return s2Instance.get<GetKelasMhsRes>("/kelas/mahasiswa");
}

export async function getKelasDosen() {
  return s2Instance.get<GetKelasDosenRes>("/kelas/dosen");
}
