import s2Instance from "@/config/s2-axios-config";
import { GetDetailSubmisiRes } from "./types";

export async function getDetailSubmisi(id: string) {
  return s2Instance.get<GetDetailSubmisiRes>(`/submisi-tugas/${id}`);
}
