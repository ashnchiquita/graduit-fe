import s1Instance from "@/config/s1-axios-config";
import { StatusMahasiswaResponse } from "./types";

export async function getStatusMahasiswaS1() {
  return await s1Instance.get<StatusMahasiswaResponse>(
    "/admin/status-mahasiswa",
    {
      withCredentials: true,
      params: {
        nim: 13521086,
      },
    },
  );
}
