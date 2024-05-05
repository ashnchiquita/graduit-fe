import { DetailSidSemHookRet } from "../types";
import { getDetailSidSemS1, isRegisteredSidSemS1 } from "../client";
import useSWR from "swr";
import { DetailSidSemResp } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/lib/dateformat";

export default function useDetailSidsem(): DetailSidSemHookRet {
  const { tipe, strata } = useParams();
  const naviagate = useNavigate();

  const tipePendaftaran =
    tipe === "sidang"
      ? "sidang"
      : tipe === "seminar"
        ? "seminar"
        : tipe === "seminar-tesis"
          ? "seminar-tesis"
          : tipe === "sidang-satu"
            ? "sidang-satu"
            : tipe === "sidang-dua"
              ? "sidang-dua"
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
    "/detail",
    async () => {
      let data: DetailSidSemResp;
      const isRegistered = await isRegisteredSidSemS1(tipePendaftaran);
      if (!isRegistered.data.data) {
        naviagate("/not-found");
      }
      if (strata?.toUpperCase() == "S1") {
        let time: string = "";
        const responseDetail = await getDetailSidSemS1(tipePendaftaran);
        console.log(responseDetail.data.data.waktu_mulai);
        if (
          responseDetail.data.data.waktu_mulai == "0001-01-01T07:07:12+07:07"
        ) {
          time = "Belum Ditetapkan";
        } else {
          console.log("masuk");
          time = formatDate(new Date(responseDetail.data.data.waktu_mulai));
          console.log(time);
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
        const responseDetail = await getDetailSidSemS1(tipePendaftaran);
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
            waktu_mulai: responseDetail.data.data.waktu_mulai,
            nama_ruangan: responseDetail.data.data.nama_ruangan,
            ditolak: responseDetail.data.data.ditolak,
          },
        };
      }

      return data;
    },
  );

  // Return the data and  value
  return {
    data,
  };
}
