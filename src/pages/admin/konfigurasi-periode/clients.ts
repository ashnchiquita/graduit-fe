import s2Instance from "@/config/s2-axios-config";
import { GetKonfigurasiResponse, PutKonfigurasiRequest } from "./types";

export function getKonfigurasi() {
  return s2Instance.get<GetKonfigurasiResponse>("/konfigurasi", {
    withCredentials: true,
  });
}

export function putKonfigurasi(payload: PutKonfigurasiRequest) {
  return s2Instance.put("/konfigurasi", payload, {
    withCredentials: true,
  });
}
