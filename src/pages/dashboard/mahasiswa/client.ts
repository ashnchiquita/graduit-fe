import loginInstance from "@/config/login-axios-config";
import s1Instance from "@/config/s1-axios-config";
import s2Instance from "@/config/s2-axios-config";
import { IsRegistered } from "@/pages/mahasiswa/detail-sidsem/types";
import {
  GetNotificationRes,
  GetPeriodeRegistrasiS2RespData,
  GetSidsemS2RespData,
  StatusMahasiswaResponse,
} from "./types";

export async function getSidsemMahasiswaS2(idMhs: string) {
  return await s2Instance.get<GetSidsemS2RespData>(
    `/registrasi-sidsem/mahasiswa/${idMhs}`,
  );
}

export async function getPeriodeRegistrasiS2() {
  return await s2Instance.get<GetPeriodeRegistrasiS2RespData>(
    `/dashboard/mahasiswa`,
  );
}

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
