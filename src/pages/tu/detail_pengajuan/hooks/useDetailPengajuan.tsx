import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailPengajuanSidang } from "../types";

export default function useDetailPengajuan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data : DetailPengajuanSidang = {
      id : "",
      nama: "",
      email: "",
      stream: "Ilmu Komputer (CS)",
      topik: "",
      deskripsi: `Tesis ini bertujuan untuk mengembangkan algoritma pemrosesan citra yang menggunakan pendekatan deep learning untuk mendeteksi objek dalam lingkungan yang tidak terstruktur, seperti lingkungan luar ruangan yang kompleks atau ruang yang tidak terkontrol dengan baik. Metode konvensional untuk deteksi objek mungkin tidak efektif dalam situasi-situasi tersebut karena berbagai tantangan seperti variasi pencahayaan, perubahan sudut pandang, dan adanya objek yang tumpang tindih.
  
      Penelitian ini akan fokus pada pengembangan arsitektur jaringan saraf tiruan yang mendalam (deep neural networks) yang mampu memahami konteks visual dari lingkungan yang tidak terstruktur dan secara akurat mendeteksi objek di dalamnya.`,
      dosen_pembimbing: "",
      dosen_penguji: [
        "",
        "",
      ],
      jenis_sidang: "",
      jadwal_sidang: new Date(),
      ruangan_sidang: "",
    };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmitChangeRuangan = async (value: string) => {
    const requestBody = { Nama : value };
  
    try {
      const response = await fetch('/ruangan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      const responseData = await response.json();
      if (response.ok) {
        const requestBody2 = {Id: id, IdRuangan: responseData.Id}

        const response2 = await  fetch('/pendaftaran-ruangan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody2),
        });
        if (response2.ok) {
          console.log('Ruangan successfully posted:', value);
        }
        
      } else {
        console.log('Error posting ruangan:', response.status);
      }
    } catch (error) {
      console.error('Error posting ruangan:', error);
    }
  };

  const fetchData = async () => {
    try {
      const seminarResponse = await fetch(`/pendaftaran-seminar?id=${id}`);
      const sidangResponse = await fetch(`/pendaftaran-sidang?id=${id}`);
  
      if (seminarResponse.ok) {
        const seminarData = await seminarResponse.json();
        data.nama = seminarData.Nama;
        data.email = seminarData.Email;
        data.topik = seminarData.Topik;
        data.deskripsi = seminarData.Deskripsi;
        data.dosen_pembimbing = seminarData.DosenPembimbing;
        data.dosen_penguji = [seminarData.DosenPenguji, ""];
        data.jenis_sidang = seminarData.Tipe;
        data.jadwal_sidang = new Date(seminarData.WaktuMulai);
        data.ruangan_sidang = seminarData.Ruang;
        console.log("Seminar Data:", seminarData);
      }
  
      if (sidangResponse.ok) {
        const sidangData = await sidangResponse.json();
        data.nama = sidangData.Nama;
        data.email = sidangData.Email;
        data.topik = sidangData.Topik;
        data.deskripsi = sidangData.Deskripsi;
        data.dosen_pembimbing = sidangData.DosenPembimbing;
        data.dosen_penguji = [
          sidangData.DosenPenguji,
          sidangData.DosenPenguji2,
        ];
        data.jenis_sidang = sidangData.Tipe;
        data.jadwal_sidang = new Date(sidangData.WaktuMulai);
        data.ruangan_sidang = sidangData.Ruang;
        console.log("Sidang Data:", sidangData);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    data,
    navigate,
    handleSubmitChangeRuangan,
  };
}
