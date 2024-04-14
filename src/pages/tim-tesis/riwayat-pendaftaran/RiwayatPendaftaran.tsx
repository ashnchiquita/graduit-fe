import { ArrowLeft, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useRiwayatPendaftaran from "./hooks/useRiwayatPendaftaran";
import { RiwayatPendaftaranHookRet } from "../rekap-pendaftaran/types";
import { formatDate } from "@/lib/dateformat";
import { Button } from "@/components/ui/button";
import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import { useNavigate } from "react-router-dom";

export default function RiwayatPendaftaran(): JSX.Element {
  const { data }: RiwayatPendaftaranHookRet = useRiwayatPendaftaran();

  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-scroll px-4 pb-6">
      {/* Identity Section */}
      <section className="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-6">
        <button onClick={() => navigate("/rekap-pendaftaran-tim-tesis")}>
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <Avatar className="size-12">
          <AvatarFallback className="bg-violet-500 text-xl text-white">
            {data && data.nama.length > 0 && data.nama[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-2 flex flex-col">
          <h1 className="text-lg font-medium">{data && data.nama}</h1>
          <p className="text-gray-500">{data && data.email}</p>
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
              <div className="flex justify-between gap-8">
                {/*  Deskripsi Topik */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-slate-600">
                      Topik
                    </label>
                    <p className="text-sm font-medium text-slate-600">
                      {pengajuan.topik.judul}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-slate-600">
                      Dosen Pembimbing
                    </label>
                    <p className="text-sm font-medium text-slate-600">
                      {pengajuan.penerima.nama}
                    </p>
                  </div>

                  {/* If it is the latest submission, let the tim tesis override the changes */}
                  {index === 0 && (
                    <Button
                      className="w-full rounded-lg border border-red-500 bg-transparent py-2 text-red-500 hover:bg-red-500/10"
                      onClick={() => {}}
                    >
                      Ubah Keputusan Dosen Pembimbing
                    </Button>
                  )}
                </div>

                {/* Status Pengajuan */}
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600">
                    Status Pendaftaran
                  </label>
                  <div className="flex w-full flex-col rounded-lg border border-gray-300 bg-slate-50">
                    <div className="flex w-full items-center justify-between p-4">
                      <p className="text-sm font-medium text-slate-600">
                        Pengiriman Registrasi
                      </p>
                      <p className="mr-[26px] text-sm font-medium text-slate-600">
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
                        <button onClick={() => {}}>
                          <Pencil size={14} className="text-gray-500" />
                        </button>
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
                        <button onClick={() => {}}>
                          <Pencil size={14} className="text-gray-500" />
                        </button>
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
