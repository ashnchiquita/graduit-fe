import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  getMhsData,
  getRegS1,
  getRegS2,
  updateInterviewS1,
  updateInterviewS2,
  updateStatusS1,
  updateStatusS2,
} from "../clients";
import { RegistrationRecapData } from "../types";

const useDetailRekapPendaftaran = () => {
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { strata, mahasiswaId } = useParams();

  const defaultMhsData = {
    id: "",
    name: "",
    email: "",
  };
  const defaultRegData = {
    apply_date: new Date(),
    interview_date: null,
    status: "",
    stream: "",
    topic: "",
    description: "",
  };

  const { data: mhsData = defaultMhsData } = useSWR(
    `/mahasiswa/${mahasiswaId}`,
    async () => {
      if (!mahasiswaId) return;

      const { data } = await getMhsData(mahasiswaId);

      return {
        id: data.nim,
        name: data.nama,
        email: data.email,
      };
    },
  );
  const { data: regData = defaultRegData } = useSWR(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async () => {
      if (!strata || !mahasiswaId) return;

      if (strata?.toLowerCase() === "s2") {
        const { data } = await getRegS2(mahasiswaId);

        return {
          apply_date: new Date(data.waktuPengiriman),
          interview_date: data.jadwalInterview
            ? new Date(data.jadwalInterview)
            : null,
          status: data.status,
          stream: data.jalurPilihan,
          topic: data.judulTopik,
          description: data.deskripsiTopik,
        };
      } else {
        const { data } = await getRegS1(mahasiswaId);
        return {
          apply_date: new Date(data.data.waktuPengiriman),
          interview_date: data.data.jadwalInterview
            ? new Date(data.data.jadwalInterview)
            : null,
          status: data.data.status,
          stream: data.data.jalurPilihan,
          topic: data.data.judulTopik,
          description: data.data.deskripsiTopik,
        };
      }
    },
  );

  const data = useMemo<RegistrationRecapData>(
    () => ({
      ...mhsData,
      ...regData,
    }),
    [mhsData, regData],
  );

  const { trigger: triggerInterview } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async (_: string, { arg }: { arg: Date }) => {
      if (!mahasiswaId) return;
      if (strata?.toLowerCase() === "s2") {
        await updateInterviewS2(mahasiswaId, arg);
      } else {
        await updateInterviewS1(mahasiswaId, arg);
      }
    },
  );
  const { trigger: triggerApprove } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async () => {
      if (!mahasiswaId) return;

      if (strata?.toLowerCase() === "s2") {
        await updateStatusS2(mahasiswaId, "APPROVED");
      } else {
        await updateStatusS1(mahasiswaId, "APPROVED");
      }
    },
  );
  const { trigger: triggerReject } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async () => {
      if (!mahasiswaId) return;

      if (strata?.toLowerCase() === "s2") {
        await updateStatusS2(mahasiswaId, "REJECTED");
      } else {
        await updateStatusS1(mahasiswaId, "REJECTED");
      }
    },
  );

  const handleInterviewUpdate = async (date: Date) => {
    const toastId = toast.loading("Menetapkan jadwal interview...");
    try {
      await triggerInterview(date);

      toast.update(toastId, {
        render: "Berhasil menetapkan jadwal interview",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menetapkan jadwal interview",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleApprove = async () => {
    const toastId = toast.loading("Menerima pendaftaran...");
    try {
      await triggerApprove();

      toast.update(toastId, {
        render: "Berhasil menerima pendaftaran",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menerima pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak pendaftaran...");
    try {
      await triggerReject();
      toast.update(toastId, {
        render: "Penolakan berhasil",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak pendaftaran",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return {
    data,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    navigate,
    handleInterviewUpdate,
    handleApprove,
    handleReject,
  };
};

export default useDetailRekapPendaftaran;
