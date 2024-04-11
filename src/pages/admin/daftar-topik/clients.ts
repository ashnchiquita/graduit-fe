import s2Instance from "@/config/s2-axios-config";
import {
  GetAllDosenPembimbingRespData,
  GetAllTopicParams,
  GetAllTopicRespData,
  PostNewTopicReqData,
  PutExistingTopicReqData,
} from "./types";

export async function getAllTopics(params: GetAllTopicParams) {
  return await s2Instance.get<GetAllTopicRespData>("/alokasi-topik", {
    params,
  });
}

export async function postNewTopic(data: PostNewTopicReqData) {
  return await s2Instance.post("/alokasi-topik", {
    data,
  });
}

export async function putExistingTopic(data: PutExistingTopicReqData) {
  return await s2Instance.put("/alokasi-topik", {
    data,
  });
}

export const getAllDosenPembimbing = () => {
  return s2Instance.get<GetAllDosenPembimbingRespData>("/dosen-bimbingan");
};
