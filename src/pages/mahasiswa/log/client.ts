import s1Instance from "@/config/s1-axios-config";
import loginInstance from "@/config/login-axios-config";
import { GetLogBimbinganStatusResData } from "./types";
import { SessionData } from "@/types/session-data";

export const getLogBimbinganStatusForS1 = (id:string) => {
  return s1Instance.get<GetLogBimbinganStatusResData>(
    `/admin/bimbingan-logs-status?id_mahasiswa=${id}&limit=5&offset=0`,
    { withCredentials: true },
  );
};

export const getMahasiswaLogin = () => {
    return loginInstance.get<SessionData>(
        '/akun',
        {
            withCredentials: true
        }
    )
}