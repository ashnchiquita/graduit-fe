"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useSession from "@/hooks/useSession";
import KonfirmasiPendaftaranCard from "./components/KonfirmasiPendaftaran";
import RegisterSidSemCard from "./components/RegisterSidSemCard";
import useDashboardMahasiswa from "./hooks/useDashboardMahasiswa";

export default function DashboardMahasiswa() {
  const { data, isRegisteredSemPro, isRegisteredSemTes, isRegisteredSidang } =
    useDashboardMahasiswa();
  const dataMahasiswa = useSession().data;
  console.log(isRegisteredSemPro, isRegisteredSidang);

  if (!data) {
    return <Skeleton />;
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start p-4 pt-0">
      {/* DATA MAHASISWA */}
      <div className="flex w-full flex-col items-center justify-start gap-4">
        {dataMahasiswa?.roles[0] === "S1_MAHASISWA" ? (
          <div className="flex w-full flex-col gap-4">
            <RegisterSidSemCard
              title="Seminar Proposal"
              path="/registration/seminar/S1"
              disabled={isRegisteredSemPro}
            />
            {isRegisteredSemPro ? (
              <KonfirmasiPendaftaranCard
                title="Seminar Proposal"
                path="/detail/seminar/S1"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}
            <RegisterSidSemCard
              title="Sidang Tugas Akhir"
              path="/registration/sidang/S1"
              disabled={isRegisteredSidang}
            />
            {isRegisteredSidang ? (
              <KonfirmasiPendaftaranCard
                title="Sidang Tugas Akhir"
                path="/detail/sidang/S1"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}
          </div>
        ) : (
          // change this into isRegistered s2 related
          <div className="flex w-full flex-col gap-4">
            <RegisterSidSemCard
              title="Seminar Tesis"
              path="/registration/seminar-proposal/S2"
              disabled={isRegisteredSemPro}
            />
            {isRegisteredSemPro && (
              <KonfirmasiPendaftaranCard
                title="Seminar Proposal"
                path="/detail/seminar-proposal/S2"
              ></KonfirmasiPendaftaranCard>
            )}

            <RegisterSidSemCard
              title="Seminar Tesis"
              path="/registration/seminar-tesis/S2"
              disabled={isRegisteredSemTes}
            />
            {isRegisteredSemTes ? (
              <KonfirmasiPendaftaranCard
                title="Seminar Tesis"
                path="/detail/seminar-tesis/S2"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}

            <RegisterSidSemCard
              title="Sidang"
              path="/registration/sidang/S2"
              disabled={isRegisteredSidang}
            />
            {isRegisteredSidang ? (
              <KonfirmasiPendaftaranCard
                title="Sidang"
                path="/detail/sidang/S2"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
