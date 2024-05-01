import s2Instance from "@/config/s2-axios-config";
import {
  GetAprrovalPendaftaranTableRes,
  GetAprrovalPendaftaranTableResS1,
} from "./types";
import s1Instance from "@/config/s1-axios-config";

export async function getRekapPendaftaranTable(params: {
  view: string;
  page: number;
  limit?: number;
  search?: string;
  status?: "NOT_ASSIGNED" | "INTERVIEW" | "APPROVED" | "REJECTED";
  order_by?: "nim";
  sort?: "ASC" | "DESC";
}) {
  return await s2Instance.get<GetAprrovalPendaftaranTableRes>(
    "/registrasi-tesis",
    {
      params,
      withCredentials: true,
    },
  );
}

export async function getRekapPendaftaranTableS1(params: {
  limit?: number;
  search?: string;
}) {
  return await s1Instance.get<GetAprrovalPendaftaranTableResS1>(
    "/TIMTA/pendaftaran-sidsem",
    {
      params,
      withCredentials: true,
    },
  );
}

export async function approvePendaftaran(id: string) {
  return await s2Instance.patch(
    `/registrasi-tesis/${id}/status`,
    {
      status: "APPROVED",
    },
    {
      withCredentials: true,
    },
  );
}

export async function rejectPendaftaran(id: string) {
  return await s2Instance.patch(
    `/registrasi-tesis/${id}/status`,
    {
      status: "REJECTED",
    },
    {
      withCredentials: true,
    },
  );
}
