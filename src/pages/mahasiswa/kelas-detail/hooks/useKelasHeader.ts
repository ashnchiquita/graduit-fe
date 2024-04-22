import { useEffect, useState } from "react";
import { KelasDialogProps } from "../components/KelasDialog";
import useSWR from "swr";
import { getKelas, getKelasDetail } from "../clients";

export type KelasHeader = {
  nomor: string;
  kodeMataKuliah: string;
  namaMataKuliah: string;
  warna: string;
  totalMahasiswa: number;
};

export default function useKelasHeader(idKelas: string) {
  const [dataKelasHeader, setDataKelasHeader] = useState<KelasHeader | null>(
    null,
  );

  const { data } = useSWR(`/tugas/kelas/${idKelas}`, async () => {
    const res = await getKelas(idKelas);
    return res.data;
  });

  useEffect(() => {
    if (data) {
      const {
        nomor,
        kode_mata_kuliah,
        nama_mata_kuliah,
        jumlah_mahasiswa,
        warna,
      } = data;
      setDataKelasHeader({
        nomor,
        kodeMataKuliah: kode_mata_kuliah,
        namaMataKuliah: nama_mata_kuliah,
        warna,
        totalMahasiswa: jumlah_mahasiswa,
      });
    }
  }, [data]);

  const [dataKelasDetail, setDataKelasDetail] =
    useState<KelasDialogProps | null>(null);

  const { data: detailData } = useSWR(
    `/tugas/kelas/${idKelas}/detail`,
    async () => {
      const res = await getKelasDetail(idKelas);
      return res.data;
    },
  );

  useEffect(() => {
    if (detailData) {
      setDataKelasDetail(detailData);
    }
  }, [detailData]);

  return {
    dataKelasHeader,
    dataKelasDetail,
  };
}
