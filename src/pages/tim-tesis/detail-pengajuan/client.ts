import s1Instance from "@/config/s1-axios-config";
import { GetDetailRes } from "./type";

export async function getDetailPengajuan(id: string) {
  return await s1Instance.get<GetDetailRes>(`TIMTA/detail-sidsem?id=${id}`, {
    withCredentials: true,
  });
}

export async function updateTempatSidang(params: {
  nama_ruangan: string;
  id_sidsem: string;
}) {
  return await s1Instance.patch(
    `TIMTA/update-ruangan-sidsem`,
    {
      nama_ruangan: params.nama_ruangan,
      id_sidsem: params.id_sidsem,
    },
    {
      withCredentials: true,
    },
  );
}

export async function updateJadwalSidang(params: {
  waktu_mulai: string;
  id_sidsem: string;
}) {
  return await s1Instance.patch(
    `TIMTA/update-jadwal-sidsem`,
    {
      waktu_mulai: params.waktu_mulai,
      id_sidsem: params.id_sidsem,
    },
    {
      withCredentials: true,
    },
  );
}

export async function approvePendaftaran(id: string) {
  return await s1Instance.patch(
    `/TIMTA/pendaftaran-ditolak`,
    {
      id: id,
      ditolak: true,
    },
    {
      withCredentials: true,
    },
  );
}

export async function rejectPendaftaran(id: string) {
  return await s1Instance.patch(
    `/TIMTA/pendaftaran-ditolak`,
    {
      id: `${id}`,
      ditolak: false,
    },
    {
      withCredentials: true,
    },
  );
}
