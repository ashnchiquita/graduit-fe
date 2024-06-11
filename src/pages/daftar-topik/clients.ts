import s2Instance from "@/config/s2-axios-config";
import s1Instance from "@/config/s1-axios-config";
import {
  GetAllDosenPembimbingRespData,
  GetAllDosenPembimbingRespDataS1,
  GetAllTopicParams,
  GetAllTopicRespData,
  GetAllTopicRespDataS1,
  PostNewTopicBulkReqData,
  PostNewTopicReqData,
  PutExistingTopicReqData,
} from "./types";

export async function getAllTopicsS2(params: GetAllTopicParams) {
  return await s2Instance.get<GetAllTopicRespData>("/alokasi-topik", {
    params,
  });
}

export async function getAllTopicsS1(params: GetAllTopicParams) {
  return await s1Instance.get<GetAllTopicRespDataS1>("/admin/alokasi-topik", {
    params,
    withCredentials: true,
  });
}

export async function postNewTopicS2(data: PostNewTopicReqData) {
  return await s2Instance.post("/alokasi-topik", data);
}

export async function postNewTopicS1(data: PostNewTopicReqData) {
  return await s1Instance.post("/admin/alokasi-topik", [data], {
    withCredentials: true,
  });
}

export async function postNewTopicBulkS2(data: PostNewTopicBulkReqData) {
  return await s2Instance.post("/alokasi-topik/bulk", data);
}

export async function postNewTopicBulkS1(data: PostNewTopicBulkReqData) {
  return await s1Instance.post("/admin/alokasi-topik", data, {
    withCredentials: true,
  });
}

export async function putExistingTopicS2(
  id: string,
  data: PutExistingTopicReqData,
) {
  return await s2Instance.put("/alokasi-topik/" + id, data);
}

export async function putExistingTopicS1(
  id: string,
  data: PutExistingTopicReqData,
) {
  return await s1Instance.put("/admin/alokasi-topik/" + id, data, {
    withCredentials: true,
  });
}

export async function deleteTopicS2(id: string) {
  return await s2Instance.delete("/alokasi-topik/" + id);
}

export async function deleteTopicS1(id: string) {
  return await s1Instance.delete("/admin/alokasi-topik/" + id, {
    withCredentials: true,
  });
}

export const getAllDosenPembimbingS2 = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan");
};

export const getAllDosenPembimbingS1 = () => {
  return s1Instance.get<GetAllDosenPembimbingRespDataS1>(
    "/admin/dosen-bimbingan",
    {
      withCredentials: true,
    },
  );
};
