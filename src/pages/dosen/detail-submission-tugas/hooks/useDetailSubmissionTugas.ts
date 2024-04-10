import { useState } from "react";

export default function useDetailSubmissionTugas() {
  const [data] = useState({
    nama: "Sundaymorning Okinawa",
    email: "okinawa@std.stei.itb.ac.id",
    nim: "23521149",
    jalurPilihan: "MMT",
    waktuSubmisi: new Date(),
    topik:
      "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
    deskripsiTopik:
      "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
    tugas: "Pengumpulan Bagian B",
    deskripsiTugas:
      "Perhatikan hanya satu orang saja yang perlu mengumpul (NIM terkecil) supaya memudahkan asisten untuk memeriksa dan mendokumentasi. Jika dalam bentuk file, jawablah dengan tautan atau link tugas.",
    berkasTugas: [
      {
        nama: "Youtube",
        link: "https://www.youtube.com/",
      },
    ],
    namaMatkul: "IF3260 Komputasi Masyarakat",
    waktuMulai: new Date(),
    waktuSelesai: new Date(),
    namaPembuat: "Dr. Rinaldy Adin, S.T., M.T.",
    waktuDibuat: new Date(),
    namaPengubah: "Dr. Rinaldy Adin, S.T., M.T.",
    waktuDiubah: new Date(),
    jawaban: "Jawaban saya adalah sebagai berikut. File terlampir.",
    berkasJawaban: [
      {
        nama: "Drive 1",
        link: "https://drive.google.com/",
      },
      {
        nama: "Drive 2",
        link: "https://drive.google.com/",
      },
    ],
  });

  return { data };
}
