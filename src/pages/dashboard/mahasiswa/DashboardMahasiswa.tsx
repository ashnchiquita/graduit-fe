import { CardDescription, CardTitle } from "@/components/Card";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import KonfirmasiPendaftaranCard from "./components/KonfirmasiPendaftaran";
import RegisterSidSemCard from "./components/RegisterSidSemCard";
import useDashboardMahasiswa from "./hooks/useDashboardMahasiswa";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { AiTwotoneNotification } from "react-icons/ai";
import { formatDate } from "@/lib/dateformat";
import { Dot } from "lucide-react";

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
          <div className="mb-1 flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <PiGraduationCapDuotone size={16} />
              <h2 className="text-base font-bold">Sidang dan Seminar</h2>
            </div>
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
          <div className="mb-1 flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <PiGraduationCapDuotone size={16} />
              <h2 className="text-base font-bold">Sidang dan Seminar</h2>
            </div>
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

        {notification.length > 0 && (
          <div className="mb-[-6px] flex items-center gap-2 self-start">
            <AiTwotoneNotification size={16} />
            <h2 className="text-base font-bold">Notifikasi</h2>
          </div>
        )}
        {notification.map((notif) => (
          <div className="w-full rounded-lg bg-white">
            <div className="flex flex-col gap-2 p-6">
              <CardTitle
                key={notif.id}
                className="flex items-center gap-0.5 text-base"
              >
                <span className="text-sm text-blue-600">
                  {formatDate(new Date(notif.createdAt))}
                </span>
                <Dot size={12} />
                {notif.title}
              </CardTitle>
              <CardDescription>{notif.description}</CardDescription>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
