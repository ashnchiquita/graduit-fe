import useSWR from "swr";
import { RegistrationRecapListData } from "../models";

export const useRegistrationRecapData = () => {
  const { data = [], ...swr } = useSWR<RegistrationRecapListData[]>(
    `regist-recap`,
    () => {
      const res: RegistrationRecapListData[] = [
        {
          id: "1",
          email: "23521149@mahasiswa.itb.ac.id",
          description: `Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih.

          Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.`,
          apply_date: new Date(),
          name: "Rava Maulana",
          status: "unreviewed",
          stream: "Ilmu Komputer (CS)",
          topic:
            "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
          interview_date: null,
        },
        {
          id: "2",
          email: "23521149@mahasiswa.itb.ac.id",
          description: `Lorem`,
          apply_date: new Date(),
          name: "Rava Maulana",
          status: "unreviewed",
          stream: "Ilmu Komputer (CS)",
          topic:
            "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
          interview_date: null,
        },
        {
          id: "3",
          email: "23521149@mahasiswa.itb.ac.id",
          description: `Lorem`,
          apply_date: new Date(),
          name: "Rava Maulana",
          status: "unreviewed",
          stream: "Ilmu Komputer (CS)",
          topic:
            "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
          interview_date: null,
        },
      ];

      return res;
    },
  );

  return { data, ...swr };
};
