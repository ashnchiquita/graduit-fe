import useSession from "@/hooks/useSession";
import DashboardDosbim from "./dosbim/DashboardDosbim";
import { RoleEnum } from "@/types/session-data";
import DashboardMahasiswa from "./mahasiswa/DashboardMahasiswa";
import DashboardTimTugas from "./tim-tugas/DashboardTimTugas";

export default function Dashboard(): JSX.Element {
  const { data, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="size-20 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
      </div>
    );
  } else if (
    data?.roles.includes(RoleEnum.S2_PEMBIMBING) ||
    data?.roles.includes(RoleEnum.S1_PEMBIMBING)
  ) {
    return <DashboardDosbim />;
  } else if (
    data?.roles.includes(RoleEnum.S2_MAHASISWA) ||
    data?.roles.includes(RoleEnum.S1_MAHASISWA)
  ) {
    return <DashboardMahasiswa />;
  } else if (
    data?.roles.includes(RoleEnum.ADMIN) ||
    (data?.roles.includes(RoleEnum.S1_TIM_TA) &&
      data?.roles.includes(RoleEnum.S2_TIM_TESIS))
  ) {
    return <DashboardTimTugas strata="ALL" />;
  } else if (data?.roles.includes(RoleEnum.S1_TIM_TA)) {
    return <DashboardTimTugas strata="S1" />;
  } else if (data?.roles.includes(RoleEnum.S2_TIM_TESIS)) {
    return <DashboardTimTugas strata="S2" />;
  } else {
    return <div>gaboleh :o</div>;
  }
}
