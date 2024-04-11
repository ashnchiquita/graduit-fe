import s2Instance from "@/config/s2-axios-config";
import { GetAllTopicParams, GetAllTopicRespData } from "./types";

export async function getAllTopics(params: GetAllTopicParams) {
  return await s2Instance.get<GetAllTopicRespData>("/alokasi-topik", {
    params,
  });
}
