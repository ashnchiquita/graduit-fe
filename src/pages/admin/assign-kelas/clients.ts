import s2Instance from "@/config/s2-axios-config";
import { GetDaftarKelasRes, GetKelasDosenRes, GetKelasMhsRes } from "./types";

export async function getKelasMhs(search?: string) {
  return s2Instance.get<GetKelasMhsRes>("/kelas/mahasiswa", {
    params: {
      search,
    },
  });
}

export async function getKelasDosen(search?: string) {
  return s2Instance.get<GetKelasDosenRes>("/kelas/dosen", {
    params: {
      search,
    },
  });
}

export async function getDaftarKelas() {
  return s2Instance.get<GetDaftarKelasRes>("/kelas", {
    params: {
      view: "S2_TIM_TESIS",
    },
  });
}

export async function assignKelasMahasiswa(data: {
  penggunaIds: string[];
  kelasIds: string[];
}) {
  return s2Instance.post("/kelas/mahasiswa/assign", data);
}

export async function unassignKelasMahasiswa(data: { penggunaIds: string[] }) {
  return s2Instance.delete("/kelas/mahasiswa/unassign", {
    data,
  });
}

export async function assignKelasDosen(data: {
  penggunaIds: string[];
  kelasIds: string[];
}) {
  return s2Instance.post("/kelas/dosen/assign", data);
}

export async function unassignKelasDosen(data: { penggunaIds: string[] }) {
  return s2Instance.delete("/kelas/dosen/unassign", {
    data,
  });
}

export async function ubahKelasMahasiswa(data: {
  penggunaId: string;
  kelasIds: string[];
}) {
  return s2Instance.put("/kelas/mahasiswa", data);
}

export async function ubahKelasDosen(data: {
  penggunaId: string;
  kelasIds: string[];
}) {
  return s2Instance.put("/kelas/dosen", data);
}
