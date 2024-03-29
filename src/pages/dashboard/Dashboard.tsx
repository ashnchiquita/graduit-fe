import useSession from "@/hooks/useSession";
import DashboardDosbim from "./dosbim/DashboardDosbim";
import { RoleEnum } from "@/types/session-data";

export default function Dashboard(): JSX.Element {
  const { data, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="size-20 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
      </div>
    );
  } else if (data?.roles.includes(RoleEnum.S2_PEMBIMBING)) {
    return <DashboardDosbim />;
  } else {
    return <div>gaboleh :o</div>;
  }
}
