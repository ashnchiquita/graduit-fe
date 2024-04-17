import s2Instance from "@/config/s2-axios-config";
import { GetRekapPendaftaranTableRes, GetStatisticsRes } from "./types";
import { GetAllDosenPembimbingRespData } from "./types";

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

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan", {
    withCredentials: true,
  });
};

export const updateDosenPembimbing = (
  id: string,
  dosenPembimbingIds: string[],
) => {
  return s2Instance.patch(`/registrasi-tesis/${id}/pembimbing`, {
    pembimbing_ids: dosenPembimbingIds,
  });
};
