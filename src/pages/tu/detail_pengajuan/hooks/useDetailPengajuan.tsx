import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailPengajuanSidang } from "../types";

export default function useDetailPengajuan() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetchData();
  }, [id]);

  const handleSubmitChangeRuangan = (value: string) => {
    console.log("TODO: Konekin ke db juga, new ruangan:", value);
  };

  const handleSendMail = () => {
    console.log("TODO: Konekin ke send mail");
  };

  //   TODO : KONEKIN KE BE
  //   const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
  //     const res = await getAllAccounts({
  //       search: searchValue === "" ? undefined : searchValue,
  //       page: table.getState().pagination.pageIndex + 1,
  //       limit: table.getState().pagination.pageSize,
  //     });

  const data: DetailPengajuanSidang = {
    nama: "Muhammad Aryo Bimoskoro Saputro",
    email: "23521149@mahasiswa.itb.ac.id",
    stream: "Ilmu Komputer (CS)",
    topik:
      "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
    deskripsi: `Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih.

    Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.`,
    dosen_pembimbing: "Dr. Rinaldy Adin, S.T., M.T.",
    dosen_penguji: [
      "Dr. Rinaldy Adin, S.T., M.T.",
      "Dr. Rinaldy Adin, S.T., M.T.",
    ],
    jenis_sidang: "Seminar Proposal",
    jadwal_sidang: new Date(),
    ruangan_sidang: "7604",
  };

  return {
    data,
    navigate,
    handleSubmitChangeRuangan,
    handleSendMail,
  };
}
