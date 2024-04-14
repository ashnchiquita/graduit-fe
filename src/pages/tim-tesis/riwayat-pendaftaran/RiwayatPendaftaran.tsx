import { ArrowLeft, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useRiwayatPendaftaran from "./hooks/useRiwayatPendaftaran";
import { RiwayatPendaftaranHookRet } from "../rekap-pendaftaran/types";
import { formatDate } from "@/lib/dateformat";
import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import EditStatusPengajuanDialog from "../components/EditStatusPengajuanDialog";
import EditDosenPembimbingDialog from "../components/EditDosenPembimbingDialog";
import EditWawancaraDialog from "../components/EditWawancaraDialog";

export default function RiwayatPendaftaran(): JSX.Element {
  const {
    data,
    setData,
    wawancaraDialogOpen,
    setWawancaraDialogOpen,
    ubahStatusDialogOpen,
    setUbahStatusDialogOpen,
    ubahDosenPembimbingDialogOpen,
    setUbahDosenPembimbingDialogOpen,
  }: RiwayatPendaftaranHookRet = useRiwayatPendaftaran();

  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-scroll px-4 pb-6">
      {/* Dialogs */}
      <EditStatusPengajuanDialog
        open={ubahStatusDialogOpen}
        setOpen={setUbahStatusDialogOpen}
        nim={data?.nim}
      />
      <EditDosenPembimbingDialog
        open={ubahDosenPembimbingDialogOpen}
        setOpen={setUbahDosenPembimbingDialogOpen}
        nim={data?.nim}
      />
      <EditWawancaraDialog
        open={wawancaraDialogOpen}
        setOpen={setWawancaraDialogOpen}
        nim={data?.nim}
      />

      {/* Identity Section */}
      <section className="flex w-full items-center gap-4 rounded-lg bg-white p-4">
        <button onClick={() => navigate("/rekap-pendaftaran-tim-tesis")}>
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <Avatar className="z-0 size-10">
          <AvatarFallback className="z-0 bg-violet-500 text-lg text-white">
            {data && data.nama.length > 0 && data.nama[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="font-medium">{data && data.nama}</h1>
          <p className="text-sm text-gray-500">{data && data.email}</p>
        </div>
      </section>

      {/* Daftar Pengajuan Section */}
      <section className="flex w-full flex-col gap-2">
        {data && data.listPengajuan.length > 0 ? (
          data.listPengajuan.map((pengajuan, index) => (
            <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 font-medium">
              {/* Title Pengajuan */}
              <h2>Pengajuan {data.listPengajuan.length - index} </h2>

              {/* Info Pengajuan */}
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8">
                {/*  Deskripsi Topik */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                      Topik
                    </label>
                    <p className="text-sm font-normal text-slate-800">
                      {pengajuan.topik.judul}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-slate-600">
                        Dosen Pembimbing
                      </label>
                      {pengajuan.status === StatusPendaftaranEnum.ACCEPTED && (
                        <TooltipProvider>
                          <Tooltip delayDuration={10}>
                            <TooltipTrigger>
                              <button
                                onClick={() =>
                                  setUbahDosenPembimbingDialogOpen(true)
                                }
                              >
                                <Pencil size={13} className="text-blue-500" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Ubah Dosen Pembimbing
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p className="text-sm font-normal text-slate-800">
                      {pengajuan.penerima.nama}
                    </p>
                  </div>
                </div>

                {/* Status Pengajuan */}
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600">
                    Status Pendaftaran
                  </label>
                  <div className="flex w-full flex-col rounded-lg border border-gray-300 bg-slate-50">
                    <div className="flex w-full items-center justify-between p-4">
                      <p className="text-sm font-medium text-slate-600">
                        Pengiriman Registrasi
                      </p>
                      <p
                        className={`${index === 0 && "mr-[26px]"} text-sm font-medium text-slate-600`}
                      >
                        {formatDate(pengajuan.waktuPengiriman)}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-between p-4">
                      <p className="text-sm font-medium text-slate-600">
                        Jadwal Interview
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-slate-600">
                          {pengajuan.jadwalInterview
                            ? formatDate(pengajuan.jadwalInterview)
                            : "Belum ditentukan"}
                        </p>
                        {index === 0 && (
                          <TooltipProvider>
                            <Tooltip delayDuration={10}>
                              <TooltipTrigger>
                                <button
                                  onClick={() => setWawancaraDialogOpen(true)}
                                >
                                  <Pencil size={14} className="text-gray-500" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Ubah Jadwal Interview
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between p-4">
                      <p className="text-sm font-medium text-slate-600">
                        Keputusan Dosen Pembimbing
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm">
                          <StatusPendaftaranBadge status={pengajuan.status} />
                        </p>
                        {index === 0 && (
                          <TooltipProvider>
                            <Tooltip delayDuration={10}>
                              <TooltipTrigger>
                                <button
                                  onClick={() => setUbahStatusDialogOpen(true)}
                                >
                                  <Pencil size={14} className="text-gray-500" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Ubah Keputusan Dosen Pembimbing
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>Belum ada pengajuan</h2>
          </div>
        )}
      </section>
    </div>
  );
}
