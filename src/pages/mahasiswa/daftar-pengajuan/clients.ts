import s2Instance from "@/config/s2-axios-config";
import { StatusS2Response } from "./types";
import s1Instance from "@/config/s1-axios-config";

export async function getStatusS2(id: string) {
  return await s2Instance.get<StatusS2Response>(
    `/registrasi-tesis/mahasiswa/${id}`,
    {
      withCredentials: true,
    },
  );
}

export async function getStatusS1(id: string) {
  return await s1Instance.get("/status-mahasiswa", {
    params: {
      nim: id,
    },
    headers: {
      Authorization:
        // HARDCODED
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVElNVEEifQ.X7BOX03ko-mdgBErB9Llku_QZUGEZcWcNM5wDsk0rW0",
    },
    withCredentials: true,
  });
}
