import { useEffect, useState } from "react";
import {
  GetAccountMahasiswaRes,
  Pengajuan,
  RiwayatPendaftaranHookRet,
} from "../types";
import useSWR from "swr";
import {
  getAccount,
  getRiwayatPendaftaran,
  getRiwayatPendaftaranS1,
  getSelfData,
} from "../clients";
import { toast } from "react-toastify";
import useSWRImmutable from "swr/immutable";
import { convertStatus } from "../../helper";
import { RoleEnum } from "@/types/session-data";

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

  const { data: listPengajuan, mutate: mutateListPengajuan } = useSWR<
    Pengajuan[]
  >(
    idMahasiswa ? `/registrasi-tesis/mahasiswa/${idMahasiswa}` : null,
    async () => {
      try {
        const self = await getSelfData();
        if (self.data.roles.includes(RoleEnum.S2_TIM_TESIS)) {
          const response = await getRiwayatPendaftaran(idMahasiswa!);

          // Map the response data to the Pengajuan type
          const mappedData = response.data.map((data) => {
            console.log(data);
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
              dosenPembimbing: data.dosenPembimbing.map((dosen) => ({
                id: dosen.id,
                nama: dosen.nama,
              })),
            };
          });

          return mappedData;
        } else {
          const response = await getRiwayatPendaftaranS1(idMahasiswa!);
          console.log(response.data.data);
          // Map the response data to the Pengajuan type
          const mappedData = response.data.data.map((data) => {
            // console.log(data.data.id);
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
              dosenPembimbing: data.dosenPembimbing.map((dosen) => ({
                id: dosen.id,
                nama: dosen.nama,
              })),
            };
          });
          return mappedData;
        }
      } catch (error) {
        console.log(error);
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

  const refreshData = () => {
    mutateListPengajuan();
  };

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
    refreshData,
  };
}
