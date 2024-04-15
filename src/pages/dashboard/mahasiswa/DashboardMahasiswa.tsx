"use client";

import BasicCard from "./components/BasicCard";
import StatusMessageWrapper from "./components/StatusMessageWrapper";
import { formatDate } from "@/lib/dateformat";
import { Skeleton } from "@/components/ui/skeleton";
import useDashboardMahasiswa from "./hooks/useDashboardMahasiswa";

export default function DashboardMahasiswa() {
  // const { id } = useParams();

  // const [data, setData] = useState<StatusMahasiswaResponse | null>();
  // useEffect(() => {
  //   s1Instance
  //     .get("/status-mahasiswa", {
  //       params: {
  //         nim: id,
  //       },
  //       headers: {
  //         Authorization:
  //           // HARDCODED
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVElNVEEifQ.X7BOX03ko-mdgBErB9Llku_QZUGEZcWcNM5wDsk0rW0",
  //       },
  //     })
  //     .then((res) => {
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       console.log("id", id);
  //     });
  // }, [id]);

  const { data } = useDashboardMahasiswa();

  if (!data) {
    return <Skeleton />;
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start p-4 pt-0">
      {/* <div className="mt-5 flex h-fit min-h-[180px] w-full flex-row overflow-hidden rounded-lg bg-white">
        <div className="w-[6px] bg-sky-700" />
        <div className="flex flex-col p-5">
          <h1 className=" mb-2 text-2xl">{title}</h1>
          <p>
            Mahasiswa diberikan kesempatan untuk memilih dosen pembimbing dan
            topik yang dikehendaki. Harap cek halaman ini berkala untuk
            mengetahui status pendaftaran.
          </p>
        </div>
      </div> */}

      {/* DATA MAHASISWA */}
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <BasicCard title="Data Mahasiswa" childClass="flex flex-row gap-8">
          <div className="mb-2">
            <p className="mb-2 font-bold">Nama</p>
            <p>{data.nama}</p>
          </div>
          <div>
            <p className="mb-2 font-bold">NIM</p>
            <p>{data.nim}</p>
          </div>
        </BasicCard>

        <BasicCard
          title="Data Tugas Akhir"
          childClass="flex w-full flex-col gap-4 text-sm text-gray-600 xl:flex-row"
        >
          {/* DATA JUDUL TOPIK */}
          <div className="flex w-full flex-col gap-4 xl:w-[40%]">
            <div>
              <p className="mb-2 font-bold">Topik</p>
              <p>{data.status_pendaftaran.topik ?? "-"}</p>
            </div>
            <div>
              <p className="mb-2 font-bold">Judul</p>
              <p>{data.status_pendaftaran.judul ?? "-"}</p>
            </div>
            <div>
              <p className="mb-2 font-bold">Dosen Pembimbing</p>
              <p>
                {data.status_pendaftaran.status
                  ? data.status_pendaftaran.dosen_pembimbing
                  : "-"}
              </p>
            </div>
          </div>

          {/* DATA PROSES PENDAFTARAN */}
          <div className="flex w-full flex-col xl:w-[60%]">
            <p className="mb-2 font-bold">Status Pendaftaran</p>

            {data.status_pendaftaran.status ? (
              <div className="relative overflow-x-auto border-[1px] border-gray-300 bg-slate-50 sm:rounded-lg">
                <table className="w-full text-left ">
                  <tbody>
                    <tr className="border-b">
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        Pengiriman Registrasi
                      </th>
                      <td className="px-4 py-2">
                        {formatDate(
                          new Date(
                            data.status_pendaftaran.pengiriman_registrasi,
                          ),
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        Persetujuan Dosen Pembimbing
                      </th>
                      <td className="px-4 py-2">
                        {data.status_pendaftaran.persetujuan_dosen_pembimbing
                          ? formatDate(
                              data.status_pendaftaran
                                .persetujuan_dosen_pembimbing,
                            )
                          : "-"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        Jadwal Interview
                      </th>
                      <td className="px-4 py-2">
                        {data.status_pendaftaran.jadwal_interview
                          ? formatDate(data.status_pendaftaran.jadwal_interview)
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium ">
                        Pengiriman Registrasi
                      </th>
                      <td className="px-4 py-2">
                        <StatusMessageWrapper
                          text={
                            data.status_pendaftaran.pengesahan_dosen_pembimbing
                              ? "Disetujui"
                              : "Tidak Disetujui"
                          }
                          isSuccess={
                            data.status_pendaftaran.pengesahan_dosen_pembimbing
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <StatusMessageWrapper
                isSuccess={false}
                text="Belum Mendaftar Tugas Akhir"
              />
            )}
          </div>
        </BasicCard>

        {/* DATA BIMBINGAN */}
        {data.status_bimbingan && (
          <BasicCard title={"Progress Bimbingan"}>
            <div>
              <p className="mb-2 font-bold">Jumlah Bimbingan</p>
              <p>{data.status_bimbingan.jumlah_bimbingan}</p>
            </div>
            <div>
              <p className="mb-2 font-bold">Riwayat Bimbingan</p>
              <p>Bimbingan 1</p>
              <p>Bimbingan 2</p>
              <p>Bimbingan 3</p>
              <p>Bimbingan 4</p>
            </div>
          </BasicCard>
        )}

        {/* DATA SEMINAR & SIDANG */}
        <div className="flex w-full flex-col gap-4 xl:flex-row">
          {data.status_seminar && (
            <BasicCard title={"Seminar"}>
              {data.status_seminar.status ? (
                <>
                  <div>
                    <p className="mb-2 font-bold">Dosen Pembimbing</p>
                    <p>{data.status_pendaftaran.dosen_pembimbing}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-bold">Dosen Penguji</p>
                    <p>{data.status_seminar.dosen_penguji}</p>
                  </div>
                  <div className="flex flex-row gap-8">
                    <div>
                      <p className="mb-2 font-bold">Jadwal</p>
                      <p>
                        {formatDate(
                          new Date(data.status_seminar.jadwal_seminar),
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-bold">Ruangan</p>
                      <p>{data.status_seminar.ruangan}</p>
                    </div>
                  </div>
                </>
              ) : (
                <StatusMessageWrapper
                  isSuccess={false}
                  text="Belum Mendaftar Seminar"
                />
              )}
            </BasicCard>
          )}

          {data.status_sidang && (
            <BasicCard title={"Sidang"}>
              {data.status_sidang.status ? (
                <>
                  <div>
                    <p className="mb-2 font-bold">Dosen Pembimbing</p>
                    <p>{data.status_pendaftaran.dosen_pembimbing}</p>
                  </div>
                  <div className="flex flex-row gap-8">
                    <div>
                      <p className="mb-2 font-bold">Dosen Penguji 1</p>
                      <p>{data.status_sidang.dosen_penguji_1}</p>
                    </div>
                    <div>
                      <p className="mb-2 font-bold">Dosen Penguji 2</p>
                      <p>{data.status_sidang.dosen_penguji_2}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-8">
                    <div>
                      <p className="mb-2 font-bold">Jadwal</p>
                      <p>
                        {formatDate(
                          new Date(data.status_sidang.jadwal_seminar),
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-bold">Ruangan</p>
                      <p>{data.status_sidang.ruangan}</p>
                    </div>
                  </div>
                </>
              ) : (
                <StatusMessageWrapper
                  isSuccess={false}
                  text="Belum Mendaftar Sidang"
                />
              )}
            </BasicCard>
          )}
        </div>
      </div>
    </main>
  );
}
