import loginInstance from "@/config/login-axios-config";
import s1Instance from "@/config/s1-axios-config";
import s2Instance from "@/config/s2-axios-config";
import {
  GetDashboardTimTAReqParams,
  GetDashboardTimTARespData,
  GetDashboardTimTesisReqParams,
  GetDashboardTimTesisRespData,
} from "./types";

export async function getDashboardTimTesisData(
  params: GetDashboardTimTesisReqParams,
) {
  return await s2Instance.get<GetDashboardTimTesisRespData>(
    "/dashboard/tim-tesis",
    { params, withCredentials: true },
  );
}

export async function getDashboardTimTAData(
  params: GetDashboardTimTAReqParams,
) {
  return await s1Instance.get<GetDashboardTimTARespData>(
    "/TIMTA/dashboard-status",
    { params, withCredentials: true },
  );
}

export async function patchArchiveMahasiswa(id: string) {
  return await loginInstance.patch<{ id: string }>("/akun/archive", {
    id,
  });
}
