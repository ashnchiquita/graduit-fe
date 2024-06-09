import s2Instance from "@/config/s2-axios-config";
import {
  GetRekapPendaftaranTableRes,
  GetStatisticsRes,
  GetStatisticsResS1,
} from "./types";
import loginInstance from "@/config/login-axios-config";
import { SelfDataRes } from "./types";
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
  return await s2Instance.get<GetRekapPendaftaranTableRes>(
    "/registrasi-tesis",
    {
      params,
      withCredentials: true,
    },
  );
}

export async function getRekapPendaftaranTableS1() {
  return await s1Instance.get<GetRekapPendaftaranTableRes>(
    "/admin/rekap-pendaftaran-timta",
    {
      withCredentials: true,
    },
  );
}

export async function getRekapPendaftaranStatistics(params: { view: string }) {
  return await s2Instance.get<GetStatisticsRes>(
    "/registrasi-tesis/statistics",
    {
      params,
      withCredentials: true,
    },
  );
}

export async function getRekapPendaftaranStatisticsS1() {
  return await s1Instance.get<GetStatisticsResS1>("/admin/statistics-timta", {
    withCredentials: true,
  });
}

export async function updateStatusS1(pendaftaranId: string, status: string) {
  return await s1Instance.put(
    `/admin/update-status-by-id`,
    {
      id_pendaftaran: pendaftaranId,
      status: status,
    },
    {
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

export async function getSelfData() {
  return await loginInstance.get<SelfDataRes>(`/auth/self`);
}
