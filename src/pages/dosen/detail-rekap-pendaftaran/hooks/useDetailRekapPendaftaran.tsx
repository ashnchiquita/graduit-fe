import { useState } from "react";
import { RegistrationRecapData } from "../types";
import { useNavigate } from "react-router-dom";

const useDetailRekapPendaftaran = () => {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState<RegistrationRecapData>({
    id: "23521149",
    name: "Sundaymorning Okinawa",
    apply_date: new Date(),
    email: "okinawa@std.stei.itb.ac.id",
    stream: "MMT",
    topic:
      "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
    description:
      "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
    interview_date: null,
    status: "NOT_ASSIGNED",
  });

  return {
    data,
    setData,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    navigate,
  };
};

export default useDetailRekapPendaftaran;
