import s1Instance from "@/config/s1-axios-config";
import {
  GetTopics,
  GetTopicResponse,
  GetDosenResponse,
  PostNewTopicBulkReqData,
} from "./types";

export async function getAllS1Topics(params: GetTopics) {
  return await s1Instance.get<GetTopicResponse>("/api/admin/alokasi-topik", {
    params,
  });
}

export async function getS1TopicByTopicId(id: string) {
  return await s1Instance.get<GetTopicResponse>(
    `/api/admin/alokasi-topik/${id}`,
  );
}

export async function getAllDosenPembimbing() {
  return await s1Instance.get<GetDosenResponse>("/api/admin/daftar-dosen");
}

export async function postTopics(data: PostNewTopicBulkReqData) {
  return await s1Instance.post("/api/admin/alokasi-topik", data);
}
