import { useState } from "react";
import { KelasDialogProps } from "../components/KelasDialog";

export type KelasHeader = {
  nomor: string;
  kodeMataKuliah: string;
  namaMataKuliah: string;
  warna: string;
  totalMahasiswa: number;
};

export default function useKelasHeader() {
  const [dataKelasHeader, setDataKelasHeader] = useState<KelasHeader>({
    nomor: "K03",
    kodeMataKuliah: "IF4031",
    namaMataKuliah: "Pengembangan Aplikasi Terdistribusi",
    warna: "bg-yellow-600/20",
    totalMahasiswa: 0,
  });

  const [dataKelasDetail, setDataKelasDetail] = useState<KelasDialogProps>({
    dosen: [
      {
        id: "1",
        nama: "Ayayayayayayayyaya",
      },
      {
        id: "2",
        nama: "Dr. Eng. Aniati Murni",
      },
    ],
    mahasiswa: [
      {
        id: "1",
        nama: "Muhammad Fauzan",
        nim: "G64180001",
      },
      {
        id: "2",
        nama: "Muhammad Fauzan",
        nim: "G64180001",
      },
      {
        id: "3",
        nama: "Na Yuyeon Pacar Chi",
        nim: "G64180001",
      },
      {
        id: "4",
        nama: "Bareum",
        nim: "G64180001",
      },
    ],
  });

  return {
    dataKelasHeader,
    dataKelasDetail,
  };
}
