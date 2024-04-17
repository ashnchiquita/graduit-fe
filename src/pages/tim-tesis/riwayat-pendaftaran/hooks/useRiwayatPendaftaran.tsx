import { useEffect, useState } from "react";
import {
  GetAccountMahasiswaRes,
  Pengajuan,
  RiwayatPendaftaranHookRet,
} from "../types";
import useSWR from "swr";
import { getAccount, getRiwayatPendaftaran } from "../clients";
import { toast } from "react-toastify";
import useSWRImmutable from "swr/immutable";
import { convertStatus } from "../../rekap-pendaftaran/helper";

export default function useRiwayatPendaftaran(): RiwayatPendaftaranHookRet {
  const [wawancaraDialogOpen, setWawancaraDialogOpen] = useState(false);
  const [ubahStatusDialogOpen, setUbahStatusDialogOpen] = useState(false);
  const [ubahDosenPembimbingDialogOpen, setUbahDosenPembimbingDialogOpen] =
    useState(false);
  const [idMahasiswa, setIdMahasiswa] = useState<string | null>();

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];
    setIdMahasiswa(id);
  }, []);

  const { data: listPengajuan } = useSWR<Pengajuan[]>(
    idMahasiswa ? `/registrasi-tesis/mahasiswa/${idMahasiswa}` : null,
    async () => {
      try {
        const response = await getRiwayatPendaftaran(idMahasiswa!);

        // Map the response data to the Pengajuan type
        const mappedData = response.data.map((data) => {
          return {
            id: data.id,
            jadwalInterview: data.jadwalInterview,
            jalurPilihan: data.jalurPilihan,
            status: convertStatus(data.status),
            waktuPengiriman: data.waktuPengiriman
              ? new Date(data.waktuPengiriman)
              : new Date(),
            judulTopik: data.judulTopik,
            deskripsiTopik: data.deskripsiTopik,
            dosenPembimbing: {
              id: data.dosenPembimbing.id,
              nama: data.dosenPembimbing.nama,
            },
          };
        });

        return mappedData;
      } catch (error) {
        toast.error("Error mendapatkan riwayat pendaftaran data");
        return [];
      }
    },
  );

  const { data: dataMahasiswa } = useSWRImmutable<GetAccountMahasiswaRes>(
    idMahasiswa ? `/akun/${idMahasiswa}` : null,
    async () => {
      const res = await getAccount(idMahasiswa!);
      return res.data;
    },
  );

  return {
    dataMahasiswa: dataMahasiswa ?? {
      id: "",
      nama: "",
      email: "",
      nim: "",
    },
    listPengajuan: listPengajuan ?? [],
    wawancaraDialogOpen,
    setWawancaraDialogOpen,
    ubahStatusDialogOpen,
    setUbahStatusDialogOpen,
    ubahDosenPembimbingDialogOpen,
    setUbahDosenPembimbingDialogOpen,
  };
}
