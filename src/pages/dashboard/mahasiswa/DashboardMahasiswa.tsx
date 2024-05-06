import useSession from "@/hooks/useSession";
import KonfirmasiPendaftaranCard from "./components/KonfirmasiPendaftaran";
import RegisterSidSemCard from "./components/RegisterSidSemCard";
import useDashboardMahasiswa from "./hooks/useDashboardMahasiswa";
import { CardDescription, CardTitle } from "@/components/Card";

export default function DashboardMahasiswa() {
  const { isRegisteredSeminar, isRegisteredSidang, notification } =
    useDashboardMahasiswa();
  const dataMahasiswa = useSession().data;
  console.log(isRegisteredSeminar, isRegisteredSidang, notification);

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start px-4 pb-20 pt-0">
      {/* DATA MAHASISWA */}
      <div className="flex w-full flex-col items-center justify-start gap-4">
        {dataMahasiswa?.roles[0] === "S1_MAHASISWA" ? (
          <div className="flex w-full flex-col gap-4">
            <RegisterSidSemCard
              title="Seminar Proposal"
              path="/registration/seminar/S1"
              disabled={isRegisteredSeminar}
            />
            {isRegisteredSeminar ? (
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
              path="/registration/seminar-tesis/S2"
              disabled={isRegisteredSeminar}
            />
            {isRegisteredSidang ? (
              <KonfirmasiPendaftaranCard
                title="Seminar Tesis"
                path="/detail/seminar/S2"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}
            <RegisterSidSemCard
              title="Sidang Tesis 1"
              path="/registration/sidang-satu/S2"
              disabled={isRegisteredSeminar}
            />
            {isRegisteredSidang ? (
              <KonfirmasiPendaftaranCard
                title="Sidang Tesis 1"
                path="/detail/sidang-satu/S2"
              ></KonfirmasiPendaftaranCard>
            ) : (
              <></>
            )}
            <RegisterSidSemCard
              title="Sidang Tesis 2"
              path="/registration/sidang-dua/S2"
              disabled={isRegisteredSeminar}
            />
            {isRegisteredSidang ? (
              <KonfirmasiPendaftaranCard
                title="Sidang Tesis 2"
                path="/detail/sidang-dua/S2"
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
