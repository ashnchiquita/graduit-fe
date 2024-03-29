import s2Instance from "@/config/s2-axios-config";
import { GetDashboardDosbimRes, GetDosbimStatisticsRes } from "./types";

export async function getDashboardDosbim() {
  return await s2Instance.get<GetDashboardDosbimRes>("/dashboard/dosbim", {
    withCredentials: true,
  });
}

export async function getDosbimStatistics() {
  return await s2Instance.get<GetDosbimStatisticsRes>(
    "/dashboard/dosbim/statistics",
    {
      withCredentials: true,
    },
  );
}
