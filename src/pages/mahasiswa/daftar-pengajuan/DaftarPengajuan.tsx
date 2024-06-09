"use client";

import BasicCard from "./components/BasicCard";
import StatusMessageWrapper from "./components/StatusMessageWrapper";
import { formatDate } from "@/lib/dateformat";
import { Skeleton } from "@/components/ui/skeleton";
import useDaftarPengajuan from "./hooks/useDaftarPengajuan";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DaftarPengajuan() {
  const { data, title } = useDaftarPengajuan();
  const navigate = useNavigate();

  const showCreateButton =
    data.length <= 0 ||
    data[0].status_pendaftaran.pengesahan_dosen_pembimbing === false;

  if (!data) {
    return <Skeleton />;
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start p-4 pt-0">
      <div className="flex h-fit min-h-[80px] w-full flex-row overflow-hidden rounded-lg bg-white">
        <div className="w-[6px] bg-sky-700" />
        <div className="flex flex-col p-5">
          <h1 className=" mb-2 text-xl font-medium">{title}</h1>
          <p className="text-base font-normal">
            Mahasiswa diberikan kesempatan untuk memilih dosen pembimbing dan
            topik yang dikehendaki. Harap cek halaman ini berkala untuk
            mengetahui status pendaftaran.
          </p>
          {showCreateButton && (
            <Button
              onClick={() => {
                navigate("/registrasi");
              }}
              className="mt-1 h-fit self-end bg-blue-500 px-4 py-2 text-sm hover:bg-blue-600"
            >
              Buat Pendaftaran Baru
            </Button>
          )}
        </div>
      </div>

      {/* DATA TESIS / TUGAS AKHIR */}
      <div className="mt-3 flex w-full flex-col gap-3">
        {data &&
          data.map((d, index) => (
            <BasicCard
              title={`Pendaftaran ${data.length - index}`}
              childClass="flex w-full flex-col gap-4 text-sm text-gray-600 xl:flex-row"
            >
              {/* DATA JUDUL TOPIK */}
              <div className="flex w-full flex-col gap-4 xl:w-2/5">
                <div>
                  <p className="mb-2 text-base font-medium">Topik</p>
                  <p className="text-sm">{d.status_pendaftaran.topik ?? "-"}</p>
                </div>

                <div>
                  <p className="mb-2 text-base font-medium">Dosen Pembimbing</p>
                  <p className="text-sm">
                    {d.status_pendaftaran.status
                      ? d.status_pendaftaran.dosen_pembimbing
                      : "-"}
                  </p>
                </div>
              </div>

              {/* DATA PROSES PENDAFTARAN */}
              <div className="flex w-full flex-col xl:w-3/5">
                <p className="mb-2 text-base font-medium">Status Pendaftaran</p>

                {d.status_pendaftaran.status ? (
                  <div className="relative overflow-x-auto border-DEFAULT border-gray-300 bg-slate-50 sm:rounded-lg">
                    <table className="w-full text-left ">
                      <tbody>
                        <tr className="border-b">
                          <th className="whitespace-nowrap px-4 py-2 text-base font-medium ">
                            Pengiriman Registrasi
                          </th>
                          <td className="px-4 py-2">
                            {formatDate(
                              new Date(
                                d.status_pendaftaran.pengiriman_registrasi,
                              ),
                            )}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <th className="whitespace-nowrap px-4 py-2 text-base font-medium ">
                            Persetujuan Dosen Pembimbing
                          </th>
                          <td className="px-4 py-2">
                            {d.status_pendaftaran.persetujuan_dosen_pembimbing
                              ? formatDate(
                                  d.status_pendaftaran
                                    .persetujuan_dosen_pembimbing,
                                )
                              : "-"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <th className="whitespace-nowrap px-4 py-2 text-base font-medium ">
                            Jadwal Interview
                          </th>
                          <td className="px-4 py-2">
                            {d.status_pendaftaran.jadwal_interview
                              ? formatDate(
                                  d.status_pendaftaran.jadwal_interview,
                                )
                              : "-"}
                          </td>
                        </tr>
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 text-base font-medium ">
                            Keputusan Dosen Pembimbing
                          </th>
                          <td className="px-4 py-2">
                            {d.status_pendaftaran
                              .pengesahan_dosen_pembimbing !== null ? (
                              <StatusMessageWrapper
                                text={
                                  d.status_pendaftaran
                                    .pengesahan_dosen_pembimbing
                                    ? "Disetujui"
                                    : "Tidak Disetujui"
                                }
                                isSuccess={
                                  d.status_pendaftaran
                                    .pengesahan_dosen_pembimbing
                                }
                              />
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <StatusMessageWrapper
                    isSuccess={false}
                    text="Belum Mendaftar"
                  />
                )}
              </div>
            </BasicCard>
          ))}
      </div>
    </main>
  );
}
