import { useState } from "react";
import { DashboardMahasiswaHookRet, StatusMahasiswaResponse } from "../types";

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

  return {
    data,
  };
}
