import s2Instance from "@/config/s2-axios-config";
import { StatusS2Response, StatusS1Response } from "./types";
import s1Instance from "@/config/s1-axios-config";

export async function getStatusS2(id: string) {
  return await s2Instance.get<StatusS2Response>(
    `/registrasi-tesis/mahasiswa/${id}`,
    {
      withCredentials: true,
    },
  );
}

export async function getStatusS1(mhsId: string) {
  return await s1Instance.get<StatusS1Response>(
    `/api/admin/pendaftaran-by-id?id=${mhsId}`,
    {
      withCredentials: true,
    },
  )
}
