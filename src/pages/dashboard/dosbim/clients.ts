import s2Instance from "@/config/s2-axios-config";
import {
  GetDashboardDosbimRes,
  GetDashboardDosbimS1Res,
  GetDosbimStatisticsRes,
  GetDosbimStatisticsS1Res,
  GetDosbimStatusBimbinganS1Res,
} from "./types";
import s1Instance from "@/config/s1-axios-config";

export async function getDashboardDosbimS2() {
  return await s2Instance.get<GetDashboardDosbimRes>("/dashboard/dosbim", {
    withCredentials: true,
  });
}

export async function getDosbimStatisticsS2() {
  return await s2Instance.get<GetDosbimStatisticsRes>(
    "/dashboard/dosbim/statistics",
    {
      withCredentials: true,
    },
  );
}

export async function getDashboardDosbimS1() {
  return await s1Instance.get<GetDashboardDosbimS1Res>(
    "/api/dosbing/dashboard",
    {
      withCredentials: true,
    },
  );
}

export async function getDosbimStatisticsS1() {
  return await s1Instance.get<GetDosbimStatisticsS1Res>(
    "/api/dosbing/dashboard/statistic",
    {
      withCredentials: true,
    },
  );
}

export async function getDosbimStatusBimbinganS1() {
  return await s1Instance.get<GetDosbimStatusBimbinganS1Res>(
    "/api/dosbing/dashboard/status-bimbingan",
    {
      withCredentials: true,
    },
  );
}
