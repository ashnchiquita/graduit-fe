import s1Instance from "@/config/s1-axios-config";
import s2Instance from "@/config/s2-axios-config";
import {
  DetailSidSemResp,
  GetDetailSidsemS2RespData,
  IsRegistered,
} from "./types";

export const getDetailSidSemS1 = (tipe: string) => {
  return s1Instance.get<DetailSidSemResp>(
    `/mahasiswa/get-sidsem-detail?tipe=${tipe}`,
    {
      withCredentials: true,
    },
  );
};

export async function isRegisteredSidSemS1(tipe: string) {
  return await s1Instance.get<IsRegistered>(
    `/mahasiswa/is-registered-sidsem?tipe=${tipe}`,
    {
      withCredentials: true,
    },
  );
}

export const getDetailSidSemS2 = async (idMhs: string) => {
  return await s2Instance.get<GetDetailSidsemS2RespData>(
    `/registrasi-sidsem/mahasiswa/${idMhs}`,
  );
};
