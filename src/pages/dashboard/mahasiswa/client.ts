import s1Instance from "@/config/s1-axios-config";
import { GetNotificationRes, StatusMahasiswaResponse } from "./types";
import { IsRegistered } from "@/pages/mahasiswa/detail-sidsem/types";
import loginInstance from "@/config/login-axios-config";

export async function getStatusMahasiswaS1() {
  return await s1Instance.get<StatusMahasiswaResponse>(
    "/admin/status-mahasiswa",
    {
      withCredentials: true,
      params: {
        nim: 13521086,
      },
    },
  );
}

export async function isRegisteredSidSemS1(tipe: string) {
  return await s1Instance.get<IsRegistered>(
    `/mahasiswa/is-registered-sidsem?tipe=${tipe}`,
    {
      withCredentials: true,
    },
  );
}

export async function getNotification() {
  return await loginInstance.get<GetNotificationRes>("/notifikasi");
}
