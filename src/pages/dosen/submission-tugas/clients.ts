import s2Instance from "@/config/s2-axios-config";
import { GetListMhsRes, GetTugasRes } from "./types";

export function getListMhs(
  tugasId: string,
  search?: string,
  isSubmitted?: boolean,
) {
  return s2Instance.get<GetListMhsRes>("/submisi-tugas", {
    params: {
      tugasId,
      search,
      isSubmitted,
    },
  });
}

export function getTugas(id: string) {
  return s2Instance.get<GetTugasRes>(`/tugas/${id}`);
}
