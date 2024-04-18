import s2Instance from "@/config/s2-axios-config";
import { GetRegMhsS2Res, RegStatistic } from "./types";

export async function getRegMhsS2(search?: string) {
  return await s2Instance.get<GetRegMhsS2Res>("/registrasi-tesis", {
    params: {
      view: "S2_PEMBIMBING",
      search,
    },
  });
}

export async function getStatisticS2() {
  return await s2Instance.get<RegStatistic>("/registrasi-tesis/statistics", {
    params: {
      view: "S2_PEMBIMBING",
    },
  });
}
