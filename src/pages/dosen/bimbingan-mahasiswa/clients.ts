import s2Instance from "@/config/s2-axios-config";
import s1Instance from "@/config/s1-axios-config";
import {
  GetLogBimbinganS2Res,
  GetLogBimbinganS1Res,
  GetMahasiswaInfoS1Res,
} from "./types";

export async function getLogBimbinganS2(id: string) {
  return await s2Instance.get<GetLogBimbinganS2Res>(`/bimbingan/${id}`, {
    withCredentials: true,
  });
}

export async function getLogBimbinganS1(id: string) {
  return await s1Instance.get<GetLogBimbinganS1Res>(
    `/admin/bimbingan-logs?id_mahasiswa=${id}&limit=5&offset=0`,
    {
      withCredentials: true,
    },
  );
}

export async function getMahasiswaInfoS1(id: string) {
  return await s1Instance.get<GetMahasiswaInfoS1Res>(
    `/admin/pengguna?id_mahasiswa=${id}`,
    {
      withCredentials: true,
    },
  );
}
