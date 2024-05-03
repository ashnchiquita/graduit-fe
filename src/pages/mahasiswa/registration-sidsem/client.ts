import s1Instance from "@/config/s1-axios-config";
import loginInstance from "@/config/login-axios-config";
import { IDMahasiswa } from "./types";

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
  return await s1Instance.get<boolean>(
    `/mahasiswa/is-registered-sidsem?tipe=${tipe}`,
    {
      withCredentials: true,
    },
  );
}
