import { useNavigate, useParams } from "react-router-dom";
import { DetailMahasiswaHookRet, MhsDetail } from "../types";
import useSWR from "swr";

export default function useDetailMahasiswa(): DetailMahasiswaHookRet {
  const navigate = useNavigate();
  const { nim } = useParams();

  const defaultData = {
    id: "",
    name: "",
    apply_date: new Date(),
    email: "",
    stream: "",
    topic: "",
    description: "",
    pembimbing: [],
  };
  const { data = defaultData } = useSWR(
    `/detail-mahasiswa/${nim}`,
    (): MhsDetail => {
      return {
        id: "23521149",
        name: "Sundaymorning Okinawa",
        apply_date: new Date(),
        email: "23521149@std.stei.itb.ac.id",
        stream: "DSAI",
        topic:
          "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
        description:
          "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
        pembimbing: [
          "Prof. Dr. Ir. Mauridhi Hery Purnomo, M.Eng.",
          "Dr. Eng. Ayu Purwarianti, S.T., M.T.",
        ],
      };
    },
  );

  return { data, navigate };
}
