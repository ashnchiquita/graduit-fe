import s2Instance from "@/config/s2-axios-config";
import { SubmisiTugasBody, SubmisiTugasResp, TugasDetailResp } from "./types";

export async function getTugasDetail(idTugas: string) {
  return await s2Instance.get<TugasDetailResp>(`/tugas/${idTugas}`, {
    withCredentials: true,
  });
}

export async function getSubmisiTugas(idTugas: string) {
  return await s2Instance.get<SubmisiTugasResp>(
    `/tugas/${idTugas}/submisi-tugas`,
    {
      withCredentials: true,
    },
  );
}

export const putSubmisiTugas = (data: SubmisiTugasBody) => {
  return s2Instance.put("/submisi-tugas", data, { withCredentials: true });
};
