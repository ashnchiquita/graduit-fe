import { useState } from "react";
import useSWR from "swr";
import { getSidsemMahasiswaS2, isRegisteredSidSemS1 } from "../client";
import { StatusMahasiswaResponse } from "../types";
// import { useParams } from "react-router-dom";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { toast } from "react-toastify";

export default function useDashboardMahasiswa() {
  const { data: sessionData } = useSession();

  const [data] = useState<StatusMahasiswaResponse>({
    id_mahasiswa: "1",
    nama: "Muhammad Rizqi",
    nim: "G64180001",
    status_pendaftaran: {
      status: true,
      topik: "Pengembangan Sistem Informasi",
      judul: "Sistem Informasi Penggajian",
      dosen_pembimbing: "Dr. Muhammad Rizqi",
      pengiriman_registrasi: new Date(),
      persetujuan_dosen_pembimbing: new Date(),
      jadwal_interview: new Date(),
      pengesahan_dosen_pembimbing: true,
    },
    status_bimbingan: {
      jumlah_bimbingan: 10,
    },
    status_seminar: {
      status: true,
      dosen_penguji: "Dr. Muhammad Rizqi",
      jadwal_seminar: new Date(),
      ruangan: "Lab. Informatika",
    },
    status_sidang: {
      status: true,
      dosen_penguji_1: "Dr. Muhammad Rizqi",
      dosen_penguji_2: "Dr. Muhammad Rizqi",
      jadwal_seminar: new Date(),
      ruangan: "Lab. Informatika",
    },
  });

  const { data: isRegisteredSeminarSidang = [], error } = useSWR<boolean[]>(
    "dashboard-mhs",
    async () => {
      if (!sessionData) return [false, false];

      if (sessionData.roles.includes(RoleEnum.S1_MAHASISWA)) {
        try {
          const responseSeminar = await isRegisteredSidSemS1("seminar");
          const responseSidang = await isRegisteredSidSemS1("sidang");
          console.log(responseSeminar);
          console.log(responseSidang);
          return [responseSeminar.data.data, false, responseSidang.data.data];
        } catch (error) {
          // Handle error and return a default value (false in this case)
          toast.error("Gagal memuat data mahasiswa");
          return [false, false, false];
        }
      } else {
        const resp = (await getSidsemMahasiswaS2(sessionData.id)).data;
        return [
          resp.jenisSidang === "SEMINAR_1" && resp.status !== "REJECTED",
          resp.jenisSidang === "SEMINAR_2" && resp.status !== "REJECTED",
          resp.jenisSidang === "SIDANG" && resp.status !== "REJECTED",
        ];
      }
    },
  );

  // Return the data and isRegistered value
  return {
    data,
    isRegisteredSemPro: error ? false : isRegisteredSeminarSidang[0],
    isRegisteredSemTes: error ? false : isRegisteredSeminarSidang[1],
    isRegisteredSidang: error ? false : isRegisteredSeminarSidang[2],
  };
}
