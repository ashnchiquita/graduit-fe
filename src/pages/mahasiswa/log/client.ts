import s1Instance from "@/config/s1-axios-config";
import loginInstance from "@/config/login-axios-config";
import { GetBimbinganS2Res, GetLogBimbinganStatusResData } from "./types";
import { SessionData } from "@/types/session-data";
import s2Instance from "@/config/s2-axios-config";

export const getLogBimbinganStatusForS1 = (id: string) => {
  return s1Instance.get<GetLogBimbinganStatusResData>(
    `/admin/bimbingan-logs-status?id_mahasiswa=${id}`,
    { withCredentials: true },
  );
};

export const getMahasiswaLogin = () => {
  return loginInstance.get<SessionData>("/akun", {
    withCredentials: true,
  });
};

export function getBimbinganS2() {
  return s2Instance.get<GetBimbinganS2Res>("/bimbingan");
}
