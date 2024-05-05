import loginInstance from "@/config/login-axios-config";
import s2Instance from "@/config/s2-axios-config";
import {
  GetDashboardTimTesisReqParams,
  GetDashboardTimTesisRespData,
} from "./types";

export async function getDashboardTimTesisData(
  params: GetDashboardTimTesisReqParams,
) {
  console.log(params);

  return await s2Instance.get<GetDashboardTimTesisRespData>(
    "/dashboard/tim-tesis",
    { params },
  );
}

export async function patchArchiveMahasiswa(id: string) {
  return await loginInstance.patch<{ id: string }>("/akun/archive", {
    id,
  });
}
