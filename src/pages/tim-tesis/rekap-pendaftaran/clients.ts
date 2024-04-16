import s2Instance from "@/config/s2-axios-config";
import { GetStatisticsRes } from "./types";

export async function getRekapPendaftaranStatistics(params: { view: string }) {
  return await s2Instance.get<GetStatisticsRes>(
    "/registrasi-tesis/statistics",
    {
      params,
      withCredentials: true,
    },
  );
}
