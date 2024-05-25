import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

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

      // if (strata?.toLowerCase() === "s2") {
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
      // } else {

      // }
    },
  );

  const data = useMemo<RegistrationRecapData>(
    () => ({
      ...mhsData,
      ...regData,
    }),
    [mhsData, regData],
  );

  const { trigger: triggerInterview, error: interviewError } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async (_: string, { arg }: { arg: Date }) => {
      if (!mahasiswaId) return;

      await updateInterviewS2(mahasiswaId, arg);
    },
  );
  const { trigger: triggerApprove, error: approveError } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async () => {
      if (!mahasiswaId) return;

      await updateStatusS2(mahasiswaId, "APPROVED");
    },
  );
  const { trigger: triggerReject, error: rejectError } = useSWRMutation(
    `/rekap-pendaftaran/${strata}/${mahasiswaId}`,
    async () => {
      if (!mahasiswaId) return;

      await updateStatusS2(mahasiswaId, "REJECTED");
    },
  );

  const handleInterviewUpdate = async (date: Date) => {
    const toastId = toast.loading("Menetapkan jadwal interview...");
    await triggerInterview(date);

    if (interviewError) {
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
    }
  };

  const handleReject = async () => {
    const toastId = toast.loading("Menolak pendaftaran...");
    await triggerReject();

    if (rejectError) {
      toast.update(toastId, {
        render: "Terjadi kesalahan dalam menolak pendaftaran",
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
