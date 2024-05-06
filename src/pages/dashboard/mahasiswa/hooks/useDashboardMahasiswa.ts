import { DashboardMahasiswaHookRet } from "../types";
import { getNotification, isRegisteredSidSemS1 } from "../client";
import useSWR from "swr";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";

export default function useDashboardMahasiswa(): DashboardMahasiswaHookRet {
  const { data: sessionData } = useSession();

  const { data: isRegisteredSeminarSidang = [] } = useSWR<boolean[]>(
    "/dashboard",
    async () => {
      try {
        if (sessionData?.roles.includes(RoleEnum.S1_MAHASISWA)) {
          const responseSeminar = await isRegisteredSidSemS1("seminar");
          const responseSidang = await isRegisteredSidSemS1("sidang");

          return [responseSeminar.data.data, responseSidang.data.data];
        } else {
          return [false, false];
        }
      } catch (error) {
        // Handle error and return a default value (true in this case)
        toast.error("Gagal memuat data mahasiswa");
        return [true, true];
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
    isRegisteredSeminar: isRegisteredSeminarSidang[0],
    isRegisteredSidang: isRegisteredSeminarSidang[1], // Provide a default value in case isRegistered is undefined
  };
}
