import s1Instance from "@/config/s1-axios-config";
import loginInstance from "@/config/login-axios-config";
import { NIM, PostLogBimbinganReqData } from "./types";

export const postLogBimbingan = (data: PostLogBimbinganReqData) => {
  return s1Instance.post<PostLogBimbinganReqData>(
    "/mahasiswa/add-bimbingan-log",
    data,
    { withCredentials: true },
  );
};

export async function getNimMahasiswa() {
  return await loginInstance.get<NIM>("/auth/self", {
    withCredentials: true,
  });
}

export const postLogBimbinganForS2 = (data: PostLogBimbinganReqData) => {
  return s1Instance.post<PostLogBimbinganReqData>(
    "/mahasiswa/add-bimbingan-log",
    data,
    { withCredentials: true },
  );
};
