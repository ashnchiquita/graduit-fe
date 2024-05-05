import s2Instance from "@/config/s2-axios-config";
import {
  GetAllDosenPembimbingRespData,
  GetAlokasiTopikPerPembimbingReqParams,
  GetAlokasiTopikPerPembimbingRespData,
  PostRegistrasiTesisRequestData,
  PostRegistrasiTesisResponseData,
  StatusS2Response,
} from "./types";

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan", {
    withCredentials: true,
  });
};

export const getAlokasiTopikPerPembimbing = (
  params: GetAlokasiTopikPerPembimbingReqParams,
) => {
  return s2Instance.get<GetAlokasiTopikPerPembimbingRespData>(
    "/alokasi-topik",
    { params, withCredentials: true },
  );
};

export const postRegistrasiTesisS2 = (data: PostRegistrasiTesisRequestData) => {
  return s2Instance.post<PostRegistrasiTesisResponseData>(
    "/registrasi-tesis",
    data,
    { withCredentials: true },
  );
};

export async function getRegS2(mhsId: string) {
  return await s2Instance.get<StatusS2Response>(
    `/registrasi-tesis/mahasiswa/${mhsId}`,
  );
}
