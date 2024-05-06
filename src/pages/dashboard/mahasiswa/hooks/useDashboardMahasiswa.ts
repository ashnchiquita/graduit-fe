import useSWR from "swr";
import {
  getNotification,
  getSidsemMahasiswaS2,
  isRegisteredSidSemS1,
} from "../client";
// import { useParams } from "react-router-dom";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { toast } from "react-toastify";

export default function useDashboardMahasiswa() {
  const { data: sessionData } = useSession();

  const { data: isRegisteredSeminarSidang = [], error } = useSWR<boolean[]>(
    "dashboard-mhs",
    async () => {
      if (!sessionData) return [false, false];

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
    },
  );

  const { data: notification = [] } = useSWR("/notification", async () => {
    const { data } = await getNotification();

    return data;
  });

  // Return the data and isRegistered value
  return {
    notification,
    isRegisteredSemPro: error ? false : isRegisteredSeminarSidang[0],
    isRegisteredSemTes: error ? false : isRegisteredSeminarSidang[1],
    isRegisteredSidang: error ? false : isRegisteredSeminarSidang[2],
  };
}
