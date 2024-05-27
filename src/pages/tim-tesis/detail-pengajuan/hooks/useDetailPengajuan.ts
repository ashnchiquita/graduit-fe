import { useMemo, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import {
  approvePendaftaran,
  getDetailPengajuan,
  getDospeng,
  rejectPendaftaran,
  updateDospeng,
  updateJadwalSidang,
  updateTempatSidang,
} from "../client";
import { Detail, Dospeng } from "../type";
import { convertToDate } from "../utils";

const useDetailPengajuan = () => {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const defaultDetailData = {
    id_mahasiswa: "",
    nama: "",
    email: "",
    jalur_pilihan: "",
    dosbing_name: "",
    dosuji_name: [],
    tipe: "",
    judul_proposal: "",
    deskripsi: "",
    berkas_sidsem: [],
    jadwal_sidang: "",
    tempat: "",
    status: false,
  };

  const defaultDospengData : Dospeng[] = []

  const { data: dospengData = defaultDospengData, mutate} = useSWR(
    `/TIMTA/get-dosuji?id=${id}`,
    async () => {
      if (!id) return;

      const { data } = await getDospeng(id);
      if(data.data.length > 0){
        return data.data.map((item: Dospeng) => ({
          id: item.id,
          nama: item.nama,
        }));
      }else{
        return [];
      }
    },
  );  

  const { data: detailData = defaultDetailData } = useSWR(
    `/TIMTA/detail-sidsem?id=${id}`,
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

  const { trigger: triggerDospeng, error: dospengError } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: Dospeng[] }) => {
      if (!id) return;

      await updateDospeng({ dosen_uji:arg, id_sidsem: id });
    },
  );


  const { trigger: triggerTempat, error: tempatError } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: string }) => {
      if (!id) return;

      await updateTempatSidang({ nama_ruangan: arg, id_sidsem: id });
    },
  );

  const { trigger: triggerJadwal, error: jadwalError } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async (_: string, { arg }: { arg: Date }) => {
      if (!id) return;
      await updateJadwalSidang({
        waktu_mulai: convertToDate(arg.toISOString()),
        id_sidsem: id,
      });
    },
  );

  const { trigger: triggerApprove, error: approveError } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      await approvePendaftaran(id);
    },
  );
  const { trigger: triggerReject, error: rejectError } = useSWRMutation(
    `/TIMTA/detail-sidsem?id=${id}`,
    async () => {
      if (!id) return;

      await rejectPendaftaran(id);
    },
  );

  const handleDospengUpdate = async (dospeng: Dospeng[]) => {
    const toastId = toast.loading("Menetapkan tempat sidang...");
    await triggerDospeng(dospeng);
    if (dospengError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan dosen penguji",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menetapkan dosen penguji",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      mutate(dospengData)
    }
  };

  const handleTempatUpdate = async (tempat: string) => {
    const toastId = toast.loading("Menetapkan tempat sidang...");
    await triggerTempat(tempat);
    if (tempatError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan tempat sidang",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menetapkan tempat sidang",
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
    const toastId = toast.loading("Menerima sidang/seminar...");
    await triggerApprove();

    if (approveError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima sidang/seminar",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Berhasil menerima sidang/seminar",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setAcceptDialogOpen(!acceptDialogOpen);
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak sidang/seminar...");
    await triggerReject();

    if (rejectError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak sidang/seminar",
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
    dospengData,
    handleDospengUpdate
  };
};

export default useDetailPengajuan;
