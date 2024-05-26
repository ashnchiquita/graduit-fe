import loginInstance from "@/config/login-axios-config";
import s1Instance from "@/config/s1-axios-config";
import s2Instance from "@/config/s2-axios-config";
import { IsRegistered } from "../detail-sidsem/types";
import {
  GetDetailSidsemS2RespData,
  IDMahasiswa,
  PostRegistraionSidSemReqDataS2,
} from "./types";

export const postRegistraionSidSemForS1 = (data: any) => {
  return s1Instance.post<any>("/mahasiswa/pendaftaran-sidsem", data, {
    withCredentials: true,
  });
};

export const getPlaceholdersS1 = (id_mahasiswa: any) => {
  return s1Instance.get<any>(
    `/mahasiswa/get-placeholders?id_mahasiswa=${id_mahasiswa}`,
    {
      withCredentials: true,
    },
  );
};

export async function getIdMahasiswa() {
  return await loginInstance.get<IDMahasiswa>("/auth/self", {
    withCredentials: true,
  });
}

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

export const postRegistrasiSidSemS2 = async (
  data: PostRegistraionSidSemReqDataS2,
) => {
  return await s2Instance.post<PostRegistraionSidSemReqDataS2>(
    "/registrasi-sidsem",
    data,
  );
};
