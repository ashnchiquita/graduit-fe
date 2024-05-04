import s1Instance from "@/config/s1-axios-config";
import { DetailSidSemResp, IsRegistered } from "./types";

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
