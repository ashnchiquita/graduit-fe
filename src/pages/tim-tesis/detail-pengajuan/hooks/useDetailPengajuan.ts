import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  approvePendaftaran,
  getDetailPengajuan,
  getDetailPengajuanS2,
  getDospeng,
  getDospengS2,
  rejectPendaftaran,
  updateDetailSidsemS2,
  updateDospeng,
  updateJadwalSidang,
  updateStatusSidsemS2,
  updateTempatSidang,
} from "../client";
import { Detail, Dospeng } from "../type";
import { convertToDate } from "../utils";

const useDetailPengajuan = () => {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [dospengDialogOpen, setDospengDialogOpen] = useState(false);
  const [jadwalDialogOpen, setJadwalDialogOpen] = useState(false);
  const [tempatDialogOpen, setTempatDialogOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const strata = searchParams.get("strata");

  const defaultDetailData: Detail = {
    id_mahasiswa: "",
    nama: "",
    email: "",
    jalur_pilihan: "",
    dosbing_name: "",
    dosuji_name: [],
    tipe: "",
    judul_proposal: "",
    judul_topik: "",
    deskripsi_proposal: "",
    deskripsi_topik: "",
    berkas_sidsem: [],
    jadwal_sidang: "",
    tempat: "",
    status: false,
  };

  const defaultDospengData: Dospeng[] = [];

  const { data: dospengData = defaultDospengData, mutate } = useSWR(
    `/TIMTA/get-dosuji?id=${id}`,
    async () => {
      if (!id) return;

      if (strata === "S1") {
        const { data } = await getDospeng(id);
        return data.data.map((item: Dospeng) => ({
          id: item.id,
          nama: item.nama,
        }));
      } else {
        const { data } = await getDospengS2();
        return data.map(({ id, nama }) => ({
          id,
          nama,
        }));
      }
    },
  );

  const { data: detailData = defaultDetailData } = useSWR(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (): Promise<Detail> => {
      if (!id) return defaultDetailData;

      if (strata === "S1") {
        const { data } = await getDetailPengajuan(id);

        return {
          id_mahasiswa: data.data.id_mahasiswa,
          nama: data.data.nama,
          email: data.data.email,
          jalur_pilihan: data.data.jalur_pilihan,
          dosbing_name: data.data.dosbing_name,
          dosuji_name: data.data.dosuji_name,
          tipe: data.data.tipe,
          judul_topik: data.data.judul_proposal,
          judul_proposal: data.data.judul_proposal,
          deskripsi_proposal: data.data.deskripsi,
          deskripsi_topik: data.data.deskripsi,
          berkas_sidsem: data.data.berkas_sidsem,
          jadwal_sidang: data.data.jadwal_sidang,
          tempat: data.data.tempat,
          status: data.data.status,
        };
      } else {
        const { data } = await getDetailPengajuanS2(id);

        return {
          id_mahasiswa: data.idMahasiswa,
          nama: data.namaMahasiswa,
          email: data.emailMahasiswa,
          jalur_pilihan: data.jalurPilihan,
          dosbing_name: data.dosenPembimbing.map(({ nama }) => nama).join(", "),
          dosuji_name: data.dosenPenguji,
          tipe: data.jenisSidang,
          judul_topik: data.judulTopik,
          deskripsi_topik: data.deskripsiTopik,
          judul_proposal: data.judulSidsem,
          deskripsi_proposal: data.deskripsiSidsem,
          berkas_sidsem: data.berkasSidsem.map(({ nama, url }) => ({
            link: url,
            nama,
          })),
          jadwal_sidang: data.jadwalSidang ?? "",
          tempat: data.ruangan ?? "",
          status:
            data.status === "NOT_ASSIGNED" ? null : data.status === "APPROVED",
        };
      }
    },
  );

  const data = useMemo<Detail>(
    () => ({
      ...detailData,
    }),
    [detailData],
  );

  const { trigger: triggerDospeng } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: Dospeng[] }) => {
      if (!id) return;

      if (strata === "S1") {
        await updateDospeng({ dosen_uji: arg, id_sidsem: id });
      } else {
        await updateDetailSidsemS2(id, {
          dosenPengujiIds: arg.map(({ id }) => id),
        });
      }
    },
  );

  const { trigger: triggerTempat } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: string }) => {
      if (!id) return;

      if (strata === "S1") {
        await updateTempatSidang({ nama_ruangan: arg, id_sidsem: id });
      } else {
        await updateDetailSidsemS2(id, { ruangan: arg });
      }
    },
  );

  const { trigger: triggerJadwal } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: Date }) => {
      if (!id) return;

      if (strata === "S1") {
        await updateJadwalSidang({
          waktu_mulai: convertToDate(arg.toISOString()),
          id_sidsem: id,
        });
      } else {
        await updateDetailSidsemS2(id, { jadwal: arg.toISOString() });
      }
    },
  );

  const { trigger: triggerApprove } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      if (strata === "S1") {
        await approvePendaftaran(id);
      } else {
        await updateStatusSidsemS2(id, { status: "APPROVED" });
      }
    },
  );
  const { trigger: triggerReject } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      if (strata === "S1") {
        await rejectPendaftaran(id);
      } else {
        await updateStatusSidsemS2(id, { status: "REJECTED" });
      }
    },
  );

  const handleDospengUpdate = async (dospeng: Dospeng[]) => {
    const toastId = toast.loading("Menetapkan dosen penguji...");
    try {
      await triggerDospeng(dospeng);
      setDospengDialogOpen(!dospengDialogOpen);
      toast.update(toastId, {
        render: "Berhasil menetapkan dosen penguji",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      mutate(dospengData);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan dosen penguji",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleTempatUpdate = async (tempat: string) => {
    const toastId = toast.loading("Menetapkan tempat sidang...");
    try {
      await triggerTempat(tempat);
      setTempatDialogOpen(!tempatDialogOpen);
      toast.update(toastId, {
        render: "Berhasil menetapkan tempat sidang",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan tempat sidang",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleJadwalUpdate = async (date: Date) => {
    const toastId = toast.loading("Menetapkan jadwal sidang/seminar...");
    try {
      await triggerJadwal(date);
      toast.update(toastId, {
        render: "Berhasil menetapkan jadwal sidang/seminar",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setJadwalDialogOpen(!jadwalDialogOpen);
    } catch (error) {
      toast.update(toastId, {
        render:
          "Terjadi kesalahan dalam menetapkan jadwal sidang/seminar, tolong periksa kembali tanggal yang dijadwalkan",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleApprove = async () => {
    const toastId = toast.loading("Menerima sidang/seminar...");
    try {
      await triggerApprove();
      toast.update(toastId, {
        render: "Berhasil menerima sidang/seminar",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setAcceptDialogOpen(!acceptDialogOpen);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima sidang/seminar",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak sidang/seminar...");
    try {
      await triggerReject();
      toast.update(toastId, {
        render: "Penolakan berhasil",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setRejectDialogOpen(!rejectDialogOpen);
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak sidang/seminar",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return {
    data,
    navigate,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    handleTempatUpdate,
    handleJadwalUpdate,
    handleApprove,
    handleReject,
    dospengData,
    handleDospengUpdate,
    strata,
    dospengDialogOpen,
    setDospengDialogOpen,
    jadwalDialogOpen,
    setJadwalDialogOpen,
    tempatDialogOpen,
    setTempatDialogOpen,
  };
};

export default useDetailPengajuan;
