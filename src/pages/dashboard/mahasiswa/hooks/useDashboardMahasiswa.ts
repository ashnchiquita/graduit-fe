import { useState } from "react";
import { DashboardMahasiswaHookRet, StatusMahasiswaResponse } from "../types";
import { isRegisteredSidSemS1 } from "../client";
import useSWR from "swr";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useDashboardMahasiswa(): DashboardMahasiswaHookRet {
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

  const { data: isRegisteredSeminarSidang = [] } = useSWR<boolean[]>(
    "/dashboard",
    async () => {
      try {
        const responseSeminar = await isRegisteredSidSemS1("seminar");
        const responseSidang = await isRegisteredSidSemS1("sidang");
        console.log(responseSeminar);
        console.log(responseSidang);
        return [responseSeminar.data.data, responseSidang.data.data];
      } catch (error) {
        // Handle error and return a default value (true in this case)
        toast.error("Gagal memuat data mahasiswa");
        return [true, true];
      }
    },
  );

  // Return the data and isRegistered value
  return {
    data,
    isRegisteredSeminar: isRegisteredSeminarSidang[0],
    isRegisteredSidang: isRegisteredSeminarSidang[1], // Provide a default value in case isRegistered is undefined
  };
}
