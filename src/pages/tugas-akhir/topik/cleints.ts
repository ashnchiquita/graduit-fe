import s1Instance from "@/config/s1-axios-config"
import {
    GetTopics,
    GetTopicResponse
} from "./types"

export async function getAllTopics(params: GetTopics) {
    return await s1Instance.get<GetTopicResponse>("/api/admin/alokasi-topik", {
        params,
        // add authorization header
    })
}

export async function getTopicByTopicId(id: string) {
    return await s1Instance.get<GetTopicResponse>(`/api/admin/alokasi-topik/${id}`, {
        // add authorization header
    })
}