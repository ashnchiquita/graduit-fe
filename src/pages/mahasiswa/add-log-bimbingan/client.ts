import s1Instance from "@/config/s1-axios-config";
import { PostLogBimbinganReqData } from "./types";

export const postLogBimbingan = (data: PostLogBimbinganReqData) => {
  return s1Instance.post<PostLogBimbinganReqData>(
    "/mahasiswa/add-bimbingan-log",
    data,
    { withCredentials: true },
  );
};
