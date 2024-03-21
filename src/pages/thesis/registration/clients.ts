import s2Instance from "@/config/s2-axios-config";
import {
  GetAllDosenPembimbingRespData,
  GetAlokasiTopikPerPembimbingReqParams,
  GetAlokasiTopikPerPembimbingRespData,
  PostRegistrasiTesisRequestData,
  PostRegistrasiTesisResponseData,
} from "./types";

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan");
};

export const getAlokasiTopikPerPembimbing = (
  params: GetAlokasiTopikPerPembimbingReqParams,
) => {
  return s2Instance.get<GetAlokasiTopikPerPembimbingRespData>(
    "/alokasi-topik",
    { params },
  );
};

export const postRegistrasiTesis = (data: PostRegistrasiTesisRequestData) => {
  return s2Instance.post<PostRegistrasiTesisResponseData>(
    "/registrasi-tesis",
    data,
  );
};
