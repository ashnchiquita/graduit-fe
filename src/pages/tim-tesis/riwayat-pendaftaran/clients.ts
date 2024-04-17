import s2Instance from "@/config/s2-axios-config";
import { Pengajuan } from "./types";
import loginInstance from "@/config/login-axios-config";
import { GetAccountMahasiswaRes } from "./types";

export async function getRiwayatPendaftaran(idMahasiswa: string) {
  return await s2Instance.get<Pengajuan[]>(
    `/registrasi-tesis/mahasiswa/${idMahasiswa}`,
    {
      withCredentials: true,
    },
  );
}

export async function getAccount(id: string) {
  return await loginInstance.get<GetAccountMahasiswaRes>(`/akun/${id}`, {
    withCredentials: true,
  });
}
