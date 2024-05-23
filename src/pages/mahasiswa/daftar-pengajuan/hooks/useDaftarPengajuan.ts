import { useEffect } from "react";
import {
  PageTitle,
  StatusMahasiswaHookRet,
  StatusMahasiswaResponse,
} from "../types";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import useSWR from "swr";
import { getStatusS1, getStatusS2 } from "../clients";
import { useParams } from "react-router-dom";

export default function useDaftarPengajuan(): StatusMahasiswaHookRet {
  const { id } = useParams();
  const { data: session } = useSession();

  const { data = [], mutate: fetchData } = useSWR(
    `/status-registrasi/${session?.id}`,
    async () => {
      if (!session) {
        return [] as StatusMahasiswaResponse[];
      }

      if (session.roles.includes(RoleEnum.S1_MAHASISWA)) {
        const res = await getStatusS1(session.id);

        const resData = res.data.map((item) => ({
          status_pendaftaran: {
            status: true,
            topik: item.judul,
            dosen_pembimbing: item.namaDosen,
            pengiriman_registrasi: new Date(item.waktuPengiriman),
            persetujuan_dosen_pembimbing: item.decidedAt
              ? new Date(item.decidedAt)
              : null,
            jadwal_interview: item.interviewAt
              ? new Date(item.interviewAt)
              : null,
            pengesahan_dosen_pembimbing:
              item.status === "APPROVED"
                ? true
                : item.status === "REJECTED"
                  ? false
                  : null,
          },
        }));

        return resData as StatusMahasiswaResponse[];
      } else {
        const res = await getStatusS2(session.id);

        const resData = res.data.map((item) => ({
          status_pendaftaran: {
            status: true,
            topik: item.judulTopik,
            dosen_pembimbing: item.dosenPembimbing[0].nama,
            pengiriman_registrasi: new Date(item.waktuPengiriman),
            persetujuan_dosen_pembimbing: item.waktuKeputusan
              ? new Date(item.waktuKeputusan)
              : null,
            jadwal_interview: item.jadwalInterview
              ? new Date(item.jadwalInterview)
              : null,
            pengesahan_dosen_pembimbing:
              item.status === "APPROVED"
                ? true
                : item.status === "REJECTED"
                  ? false
                  : null,
          },
        }));

        return resData as StatusMahasiswaResponse[];
      }
    },
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return {
    data,
    title: session?.roles.includes(RoleEnum.S1_MAHASISWA)
      ? PageTitle.STATUS_TUGAS_AKHIR
      : PageTitle.STATUS_TESIS,
  };
}
