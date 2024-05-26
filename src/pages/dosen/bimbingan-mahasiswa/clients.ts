import s1Instance from "@/config/s1-axios-config";
import s2Instance from "@/config/s2-axios-config";
import {
  GetLogBimbinganS1Res,
  GetLogBimbinganS2Res,
  GetMahasiswaInfoS1Res,
  UpdateStatusBimbinganLogRes,
} from "./types";

export async function getLogBimbinganS2(id: string) {
  return await s2Instance.get<GetLogBimbinganS2Res>(
    `/bimbingan/mahasiswa/${id}`,
  );
}

export async function updatePengesahanS2(id: string, status: boolean) {
  return await s2Instance.patch(`/bimbingan/pengesahan`, {
    bimbinganId: id,
    status,
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
    `/dosbing/info-topik-mahasiswa?id_mahasiswa=${id}`,
    {
      withCredentials: true,
    },
  );
}

export async function updateStatusBimbinganLog(id: string, status: boolean) {
  return await s1Instance.post<UpdateStatusBimbinganLogRes>(
    `/dosbing/update-status-bimbingan-log?id_log=${id}`,
    {
      status: status,
    },
    {
      withCredentials: true,
    },
  );
}
