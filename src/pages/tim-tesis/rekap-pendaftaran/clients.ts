import s2Instance from "@/config/s2-axios-config";
import { GetRekapPendaftaranTableRes, GetStatisticsRes } from "./types";

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

export async function getRekapPendaftaranStatistics(params: { view: string }) {
  return await s2Instance.get<GetStatisticsRes>(
    "/registrasi-tesis/statistics",
    {
      params,
      withCredentials: true,
    },
  );
}
