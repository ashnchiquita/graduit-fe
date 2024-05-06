import s1Instance from "@/config/s1-axios-config";
import loginInstance from "@/config/login-axios-config";
import { IDMahasiswa, PostLogBimbinganReqData } from "./types";
import s2Instance from "@/config/s2-axios-config";

export const postLogBimbingan = (data: PostLogBimbinganReqData) => {
  return s1Instance.post<PostLogBimbinganReqData>(
    "/mahasiswa/add-bimbingan-log",
    data,
    { withCredentials: true },
  );
};

export async function getNimMahasiswa() {
  return await loginInstance.get<IDMahasiswa>("/auth/self", {
    withCredentials: true,
  });
}

export const postLogBimbinganForS2 = (data: PostLogBimbinganReqData) => {
  return s2Instance.post<PostLogBimbinganReqData>(
    "/bimbingan",
    {
      waktuBimbingan: data.date,
      laporanKemajuan: data.laporan_kemajuan,
      todo: data.todo,
      bimbinganBerikutnya: data.next_bimbingan,
      berkas: data.berkas.map((b) => ({
        nama: b.nama,
        url: b.link,
      })),
    },
    {
      withCredentials: true,
    },
  );
};
