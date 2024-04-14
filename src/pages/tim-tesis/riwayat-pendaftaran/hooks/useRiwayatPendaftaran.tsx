import { useState } from "react";
import {
  RiwayatPendaftaranData,
  RiwayatPendaftaranHookRet,
} from "../../rekap-pendaftaran/types";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

export default function useRiwayatPendaftaran(): RiwayatPendaftaranHookRet {
  const [wawancaraDialogOpen, setWawancaraDialogOpen] = useState(false);
  const [ubahStatusDialogOpen, setUbahStatusDialogOpen] = useState(false);
  const [ubahDosenPembimbingDialogOpen, setUbahDosenPembimbingDialogOpen] =
    useState(false);

  // TODO: Fetch data from API, dont forget to sort the listPengajuan by waktuPengiriman from most recent to oldest

  const [data, setData] = useState<RiwayatPendaftaranData>({
    nim: "13521149",
    nama: "Rava Maulana Azzikri",
    email: "13521149@std.stei.itb.ac.id",
    listPengajuan: [
      {
        id: "1",
        jalurPilihan: "Tesis",
        waktuPengiriman: new Date(),
        jadwalInterview: new Date(),
        waktuKeputusan: new Date(),
        status: StatusPendaftaranEnum.ACCEPTED,
        topik: {
          id: "1",
          judul:
            "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
          deskripsi:
            "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
          idPengaju: "13521149",
          periode: "2021/2022",
        },
        penerima: {
          id: "1",
          nama: "Mr. Donald Trump",
          email: "dosbim@gmail.com",
        },
      },
      {
        id: "2",
        jalurPilihan: "Tesis",
        waktuPengiriman: new Date(),
        jadwalInterview: new Date(),
        waktuKeputusan: new Date(),
        status: StatusPendaftaranEnum.PROCESS,
        topik: {
          id: "2",
          judul:
            "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
          deskripsi:
            "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
          idPengaju: "13521149",
          periode: "2021/2022",
        },
        penerima: {
          id: "2",
          nama: "Mr. Joe Biden",
          email: "joebiden@gmail.com",
        },
      },
    ],
  });

  return {
    data,
    setData,
    wawancaraDialogOpen,
    setWawancaraDialogOpen,
    ubahStatusDialogOpen,
    setUbahStatusDialogOpen,
    ubahDosenPembimbingDialogOpen,
    setUbahDosenPembimbingDialogOpen,
  };
}
