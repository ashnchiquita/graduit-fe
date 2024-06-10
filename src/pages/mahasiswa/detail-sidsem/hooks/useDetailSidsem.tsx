import useSession from "@/hooks/useSession";
import { formatDate } from "@/lib/dateformat";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  getDetailSidSemS1,
  getDetailSidSemS2,
  isRegisteredSidSemS1,
} from "../client";
import { DetailSidSemResp } from "../types";

export default function useDetailSidsem() {
  const { tipe, strata } = useParams();
  const { data: sessionData } = useSession();
  const naviagate = useNavigate();

  const tipePendaftaran =
    tipe === "sidang"
      ? "Sidang"
      : tipe === "seminar"
        ? "Seminar Proposal"
        : tipe === "seminar-proposal"
          ? "Seminar-Proposal"
          : tipe === "seminar-tesis"
            ? "seminar-tesis"
            : tipe === "sidang"
              ? "Sidang"
              : "";

  const defaultData: DetailSidSemResp = {
    data: {
      id_mahasiswa: "",
      nama: "",
      email: "",
      jalur_pilihan: "",
      judul: "",
      deskripsi: "",
      dosbing_name: "",
      tipe: "",
      waktu_mulai: "",
      nama_ruangan: "",
      ditolak: false,
    },
  };

  const { data = defaultData } = useSWR<DetailSidSemResp>(
    "detail-sidsem",
    async () => {
      let data: DetailSidSemResp;

      if (strata?.toUpperCase() === "S1") {
        const isRegistered = await isRegisteredSidSemS1(
          tipePendaftaran.toLowerCase(),
        );
        if (!isRegistered.data.data) {
          naviagate("/not-found");
        }

        let time: string = "";
        const responseDetail = await getDetailSidSemS1(
          tipePendaftaran.toLowerCase(),
        );
        if (responseDetail.data.data.waktu_mulai === "") {
          time = "Belum Ditetapkan";
        } else {
          const rawDate = responseDetail.data.data.waktu_mulai;
          const cleanedDate = rawDate ? rawDate.replace(" WIB", "") : null;
          time = formatDate(new Date(cleanedDate!));
        }
        data = {
          data: {
            id_mahasiswa: responseDetail.data.data.id_mahasiswa,
            nama: responseDetail.data.data.nama,
            email: responseDetail.data.data.email,
            jalur_pilihan: responseDetail.data.data.jalur_pilihan,
            judul: responseDetail.data.data.judul,
            deskripsi: responseDetail.data.data.deskripsi,
            dosbing_name: responseDetail.data.data.dosbing_name,
            tipe: responseDetail.data.data.tipe,
            waktu_mulai: time,
            nama_ruangan: responseDetail.data.data.nama_ruangan,
            ditolak: responseDetail.data.data.ditolak,
          },
        };
      } else {
        // TODO has registered guard
        const responseDetail = (await getDetailSidSemS2(sessionData?.id ?? ""))
          .data;

        data = {
          data: {
            id_mahasiswa: responseDetail.idMahasiswa,
            nama: responseDetail.namaMahasiswa,
            email: responseDetail.emailMahasiswa,
            jalur_pilihan: responseDetail.jalurPilihan,
            judul: responseDetail.judulSidsem,
            deskripsi: responseDetail.deskripsiSidsem,
            dosbing_name: responseDetail.dosenPembimbing
              .map((dosen) => dosen.nama)
              .join(", "),
            tipe: responseDetail.jenisSidang,
            waktu_mulai: responseDetail.jadwalSidang ?? "Belum ditentukan",
            nama_ruangan: responseDetail.ruangan ?? "Belum ditentukan",
            ditolak:
              responseDetail.status === "APPROVED"
                ? true
                : responseDetail.status === "REJECTED"
                  ? false
                  : null,
          },
        };
      }

      return data;
    },
  );

  // Return the data and  value
  return {
    data,
    tipePendaftaran,
  };
}
