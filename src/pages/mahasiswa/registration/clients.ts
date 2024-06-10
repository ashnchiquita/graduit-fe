import s2Instance from "@/config/s2-axios-config";
import s1Instance from "@/config/s1-axios-config";
import {
  GetAllDosenPembimbingRespData,
  GetAlokasiTopikPerPembimbingReqParams,
  GetAlokasiTopikPerPembimbingRespData,
  PostRegistrasiTesisRequestData,
  PostRegistrasiTesisResponseData,
  PostRegistrasiTARequestData,
  StatusS1Response,
  StatusS2Response,
  GetAllDosenPembimbingRespDataS1,
  GetAlokasiTopikPerPembimbingRespDataS1,
} from "./types";

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan", {
    withCredentials: true,
  });
};

export const getAllDosenPembimbingS1 = () => {
  return s1Instance.get<GetAllDosenPembimbingRespDataS1>(
    "/admin/dosen-bimbingan",
    {
      withCredentials: true,
    },
  );
};

export const getAlokasiTopikPerPembimbing = (
  params: GetAlokasiTopikPerPembimbingReqParams,
) => {
  return s2Instance.get<GetAlokasiTopikPerPembimbingRespData>(
    "/alokasi-topik",
    { params, withCredentials: true },
  );
};

export const getAlokasiTopikPerPembimbingS1 = (
  params: GetAlokasiTopikPerPembimbingReqParams,
) => {
  return s1Instance.get<GetAlokasiTopikPerPembimbingRespDataS1>(
    "/admin/alokasi-topik",
    {
      params,
      withCredentials: true,
    },
  );
};

export const postRegistrasiTAS1 = (data: PostRegistrasiTesisRequestData) => {
  function convertToPostRegistrasiTARequestData(
    data: PostRegistrasiTesisRequestData,
  ): PostRegistrasiTARequestData {
    return {
      idMahasiswa: data.idMahasiswa,
      idTopik: data.idTopik ?? "",
      idDosen: data.idPenerima,
      judulTopik: data.judulTopik ?? "",
      deskripsiTopik: data.deskripsiTopik ?? "",
      jalurPilihan: data.jalurPilihan,
    };
  }

  return s1Instance.post<PostRegistrasiTesisResponseData>(
    "/admin/pendaftaran",
    convertToPostRegistrasiTARequestData(data),
    { withCredentials: true },
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

export async function getRegS1(mhsId: string) {
  return await s1Instance.get<StatusS1Response>(
    `/admin/pendaftaran-by-id?id=${mhsId}`,
    {
      withCredentials: true,
    },
  );
}
