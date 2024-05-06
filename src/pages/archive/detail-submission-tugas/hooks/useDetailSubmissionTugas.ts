import { DetailSubmissionTugasHookRet } from "../types";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getDetailSubmisi } from "../clients";

export default function useDetailSubmissionTugas(): DetailSubmissionTugasHookRet {
  const { idSubmisi } = useParams();
  // const [data] = useState<DetailSubmisi>({
  //   nama: "Sundaymorning Okinawa",
  //   email: "okinawa@std.stei.itb.ac.id",
  //   nim: "23521149",
  //   jalurPilihan: "MMT",
  //   waktuSubmisi: new Date(),
  //   topik:
  //     "Pengembangan Algoritma Pemrosesan Citra Berbasis Deep Learning untuk Deteksi Objek dalam Lingkungan Tidak Terstruktur",
  //   deskripsiTopik:
  //     "Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih. Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.",
  //   tugas: "Pengumpulan Bagian B",
  //   deskripsiTugas:
  //     "Perhatikan hanya satu orang saja yang perlu mengumpul (NIM terkecil) supaya memudahkan asisten untuk memeriksa dan mendokumentasi. Jika dalam bentuk file, jawablah dengan tautan atau link tugas.",
  //   berkasTugas: [
  //     {
  //       nama: "Youtube",
  //       link: "https://www.youtube.com/",
  //     },
  //   ],
  //   namaMatkul: "IF3260 Komputasi Masyarakat",
  //   waktuMulai: new Date(),
  //   waktuSelesai: new Date(),
  //   namaPembuat: "Dr. Rinaldy Adin, S.T., M.T.",
  //   waktuDibuat: new Date(),
  //   namaPengubah: "Dr. Rinaldy Adin, S.T., M.T.",
  //   waktuDiubah: new Date(),
  //   jawaban: "Jawaban saya adalah sebagai berikut. File terlampir.",
  //   berkasJawaban: [
  //     {
  //       nama: "Drive 1",
  //       link: "https://drive.google.com/",
  //     },
  //     {
  //       nama: "Drive 2",
  //       link: "https://drive.google.com/",
  //     },
  //   ],
  // });

  const defaultData = {
    nama: "",
    email: "",
    nim: "",
    jalurPilihan: "",
    waktuSubmisi: new Date(),
    topik: "",
    deskripsiTopik: "",
    tugas: "",
    deskripsiTugas: "",
    berkasTugas: [],
    namaMatkul: "",
    waktuMulai: new Date(),
    waktuSelesai: new Date(),
    namaPembuat: "",
    waktuDibuat: new Date(),
    namaPengubah: "",
    waktuDiubah: new Date(),
    jawaban: "",
    berkasJawaban: [],
  };

  const { data = defaultData } = useSWR(`/submisi/${idSubmisi}`, async () => {
    if (!idSubmisi) return defaultData;

    const { data } = await getDetailSubmisi(idSubmisi);
    return {
      nama: data.pendaftaran.nama,
      email: data.pendaftaran.email,
      nim: data.pendaftaran.id,
      jalurPilihan: data.pendaftaran.pendaftaranTesis.jalurPilihan,
      waktuSubmisi: new Date(data.submisiTugas.submittedAt),
      topik: data.pendaftaran.pendaftaranTesis.topik.judul,
      deskripsiTopik: data.pendaftaran.pendaftaranTesis.topik.deskripsi,
      tugas: data.tugas.judul,
      deskripsiTugas: data.tugas.deskripsi,
      berkasTugas:
        data.tugas?.berkasTugas.map((b) => ({
          nama: b.nama,
          link: b.url,
        })) ?? [],
      namaMatkul: `${data.tugas.kelas.mataKuliah.kode} ${data.tugas.kelas.mataKuliah.nama}`,
      waktuMulai: new Date(data.tugas.waktuMulai),
      waktuSelesai: new Date(data.tugas.waktuSelesai),
      namaPembuat: data.tugas.pembuat.nama,
      waktuDibuat: new Date(data.tugas.createdAt),
      namaPengubah: data.tugas.pengubah.nama,
      waktuDiubah: new Date(data.tugas.updatedAt),
      jawaban: data.submisiTugas.jawaban,
      berkasJawaban:
        data.submisiTugas?.berkasSubmisiTugas.map((b) => ({
          nama: b.nama,
          link: b.url,
        })) ?? [],
    };
  });

  return { data };
}
