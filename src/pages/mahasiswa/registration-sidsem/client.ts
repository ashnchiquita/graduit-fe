import s1Instance from "@/config/s1-axios-config";
// import loginInstance from "@/config/login-axios-config";
// import { NIM, PostLogBimbinganReqData } from "./types";

export const postRegistraionSidSemForS1 = (data: any) => {
  return s1Instance.post<any>("/mahasiswa/add-bimbingan-log", data, {
    withCredentials: true,
  });
};
