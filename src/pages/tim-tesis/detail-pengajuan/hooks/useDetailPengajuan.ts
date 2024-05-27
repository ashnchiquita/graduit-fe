import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import {
  approvePendaftaran,
  getDetailPengajuan,
  rejectPendaftaran,
  updateJadwalSidang,
  updateTempatSidang,
} from "../client";
import { Detail } from "../type";
import { convertToDate } from "../utils";

const useDetailPengajuan = () => {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const defaultDetailData = {
    id_mahasiswa: "",
    nama: "",
    email: "",
    jalur_pilihan: "",
    dosbing_name: "",
    dosuji_name: "",
    tipe: "",
    judul_proposal: "",
    deskripsi: "",
    berkas_sidsem: [],
    jadwal_sidang: "",
    tempat: "",
    status: false,
  };

  const { data: detailData = defaultDetailData } = useSWR(
    `TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      const { data } = await getDetailPengajuan(id);

      return {
        id_mahasiswa: data.data.id_mahasiswa,
        nama: data.data.nama,
        email: data.data.email,
        jalur_pilihan: data.data.jalur_pilihan,
        dosbing_name: data.data.dosbing_name,
        dosuji_name: data.data.dosuji_name,
        tipe: data.data.tipe,
        judul_proposal: data.data.judul_proposal,
        deskripsi: data.data.deskripsi,
        berkas_sidsem: data.data.berkas_sidsem,
        jadwal_sidang: data.data.jadwal_sidang,
        tempat: data.data.tempat,
        status: data.data.status,
      };
    },
  );

  const data = useMemo<Detail>(
    () => ({
      ...detailData,
    }),
    [detailData],
  );

  const { trigger: triggerTempat, error: tempatError } = useSWRMutation(
    `TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: string }) => {
      if (!id) return;

      await updateTempatSidang({ nama_ruangan: arg, id_sidsem: id });
    },
  );

  const { trigger: triggerJadwal, error: jadwalError } = useSWRMutation(
    `TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: Date }) => {
      if (!id) return;
      await updateJadwalSidang({
        waktu_mulai: convertToDate(arg.toISOString()),
        id_sidsem: id,
      });
    },
  );

  const { trigger: triggerApprove, error: approveError } = useSWRMutation(
    `TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      await approvePendaftaran(id);
    },
  );
  const { trigger: triggerReject, error: rejectError } = useSWRMutation(
    `TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      await rejectPendaftaran(id);
    },
  );

  const handleTempatUpdate = async (tempat: string) => {
    const toastId = toast.loading("Menetapkan jadwal interview...");
    await triggerTempat(tempat);
    if (tempatError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan jadwal interview",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menetapkan jadwal interview",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleJadwalUpdate = async (date: Date) => {
    const toastId = toast.loading("Menetapkan jadwal interview...");
    await triggerJadwal(date);

    if (jadwalError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan jadwal interview",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menetapkan jadwal interview",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleApprove = async () => {
    const toastId = toast.loading("Menerima pendaftaran...");
    await triggerApprove();

    if (approveError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menerima pendaftaran",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setAcceptDialogOpen(!acceptDialogOpen);
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak pendaftaran...");
    await triggerReject();

    if (rejectError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak sidang",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Penolakan berhasil",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setRejectDialogOpen(!rejectDialogOpen);
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
  };
};

export default useDetailPengajuan;
