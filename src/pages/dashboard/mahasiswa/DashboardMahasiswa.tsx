import { CardDescription, CardTitle } from "@/components/Card";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import KonfirmasiPendaftaranCard from "./components/KonfirmasiPendaftaran";
import RegisterSidSemCard from "./components/RegisterSidSemCard";
import useDashboardMahasiswa from "./hooks/useDashboardMahasiswa";

export default function DashboardMahasiswa() {
  const {
    isRegisteredSemPro,
    isRegisteredSemTes,
    isRegisteredSidang,
    notification,
    isSemproPeriod,
    isSemtesPeriod,
    isSidangPeriod,
  } = useDashboardMahasiswa();
  const dataMahasiswa = useSession().data;

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start px-4 pb-20 pt-0">
      {/* DATA MAHASISWA */}
      <div className="flex w-full flex-col items-center justify-start gap-4">
        {notification.length === 0 &&
          !isSemproPeriod &&
          !isSemtesPeriod &&
          !isSidangPeriod && (
            <div>
              Notifikasi Anda kosong dan tidak ada registrasi seminar/sidang
              yang sedang terbuka
            </div>
          )}
        {!dataMahasiswa ? (
          <></>
        ) : dataMahasiswa.roles.includes(RoleEnum.S1_MAHASISWA) ? (
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
          <div className="flex w-full flex-col gap-4">
            {isSemproPeriod && (
              <RegisterSidSemCard
                title="Seminar Proposal"
                path="/registration/seminar-proposal/S2"
                disabled={isRegisteredSemPro}
              />
            )}
            {isRegisteredSemPro && (
              <KonfirmasiPendaftaranCard
                title="Seminar Proposal"
                path="/detail/seminar-proposal/S2"
              ></KonfirmasiPendaftaranCard>
            )}

            {isSemtesPeriod && (
              <RegisterSidSemCard
                title="Seminar Tesis"
                path="/registration/seminar-tesis/S2"
                disabled={isRegisteredSemTes}
              />
            )}
            {isRegisteredSemTes ? (
              <KonfirmasiPendaftaranCard
                title="Seminar Tesis"
                path="/detail/seminar-tesis/S2"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}

            {isSidangPeriod && (
              <RegisterSidSemCard
                title="Sidang"
                path="/registration/sidang/S2"
                disabled={isRegisteredSidang}
              />
            )}
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

        {notification.map((notif) => (
          <div className="w-full rounded-lg bg-white">
            <div className="flex flex-col gap-2 p-6">
              <CardTitle key={notif.id}>{notif.title}</CardTitle>
              <CardDescription>{notif.description}</CardDescription>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
