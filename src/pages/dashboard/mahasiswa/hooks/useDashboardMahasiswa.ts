import useSWR from "swr";
import {
  getNotification,
  getPeriodeRegistrasiS2,
  getSidsemMahasiswaS2,
  isRegisteredSidSemS1,
} from "../client";
// import { useParams } from "react-router-dom";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { toast } from "react-toastify";

export default function useDashboardMahasiswa() {
  const { data: sessionData } = useSession();

  const { data: isRegisteredSeminarSidang = [], error: registeredSidsemError } =
    useSWR<boolean[]>("dashboard-mhs", async () => {
      if (!sessionData) return [false, false, false];

      if (sessionData.roles.includes(RoleEnum.S1_MAHASISWA)) {
        try {
          const responseSeminar = await isRegisteredSidSemS1("seminar");
          const responseSidang = await isRegisteredSidSemS1("sidang");
          console.log(responseSeminar);
          console.log(responseSidang);
          return [responseSeminar.data.data, false, responseSidang.data.data];
        } catch (error) {
          // Handle error and return a default value (false in this case)
          toast.error("Gagal memuat data mahasiswa");
          return [false, false, false];
        }
      } else {
        const resp = (await getSidsemMahasiswaS2(sessionData.id)).data;
        return [
          resp.jenisSidang === "SEMINAR_1" && resp.status !== "REJECTED",
          resp.jenisSidang === "SEMINAR_2" && resp.status !== "REJECTED",
          resp.jenisSidang === "SIDANG" && resp.status !== "REJECTED",
        ];
      }
    });

  const { data: isRegistrationPeriod = [], error: registrationPeriodError } =
    useSWR<boolean[]>("dashboard-mhs-periode", async () => {
      if (!sessionData) return [false, false, false];

      if (sessionData.roles.includes(RoleEnum.S1_MAHASISWA)) {
        return [true, true, true];
      } else {
        const resp = (await getPeriodeRegistrasiS2()).data;
        console.log(resp);

        return [resp.isSemproPeriod, resp.isSemtesPeriod, resp.isSidangPeriod];
      }
    });

  const { data: notification = [] } = useSWR("/notification", async () => {
    const { data } = await getNotification();

    return data;
  });

  // Return the data and isRegistered value
  return {
    notification,
    isRegisteredSemPro: registeredSidsemError
      ? false
      : isRegisteredSeminarSidang[0],
    isRegisteredSemTes: registeredSidsemError
      ? false
      : isRegisteredSeminarSidang[1],
    isRegisteredSidang: registeredSidsemError
      ? false
      : isRegisteredSeminarSidang[2],
    isSemproPeriod: registrationPeriodError ? false : isRegistrationPeriod[0],
    isSemtesPeriod: registrationPeriodError ? false : isRegistrationPeriod[1],
    isSidangPeriod: registrationPeriodError ? false : isRegistrationPeriod[2],
  };
}
