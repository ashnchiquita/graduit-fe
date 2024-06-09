// Library imports
import { useState } from "react";

// Component imports

// Local imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LetteredAvatar from "@/components/ui/lettered-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import loginInstance from "@/config/login-axios-config";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { VscChevronRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const roleEnumMapping: Record<RoleEnum, string> = {
  ADMIN: "Admin",
  TU: "TU",
  S2_MAHASISWA: "Mahasiswa S2",
  S2_PEMBIMBING: "Dosen Pembimbing S2",
  S2_PENGUJI: "Dosen Penguji S2",
  S2_TIM_TESIS: "Tim Tesis",
  S1_MAHASISWA: "Mahasiswa S1",
  S1_PEMBIMBING: "Dosen Pembimbing S1",
  S1_PENGUJI: "Dosen Penguji S1",
  S1_TIM_TA: "Tim Tugas Akhir",
};

export default function Profile(): JSX.Element {
  // Component imports
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await loginInstance.post("/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      toast.error("Gagal logout! Coba lagi setelah beberapa saat.");
    }
  };

  const { data: sessionData, isLoading } = useSession();

  return (
    <>
      {!isLoading && sessionData ? (
        <>
          <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
            <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-slate-100 p-2">
              {/* <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-slate-100 p-2"> */}
              <div className="flex items-center gap-3">
                <LetteredAvatar name={sessionData.nama} />
                <div className="flex flex-col items-start">
                  <p className="text-xs font-medium">{sessionData.nama}</p>
                  <p className="text-xs">
                    {sessionData.roles
                      .map((role) => roleEnumMapping[role])
                      .join(", ")}
                  </p>
                </div>
              </div>
              <VscChevronRight size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="z-[99] flex w-full flex-col gap-2 p-2"
            >
              {(sessionData.roles.includes(RoleEnum.S2_PEMBIMBING) ||
                sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) && (
                <>
                  <DropdownMenuItem>
                    <button
                      disabled={isLoading}
                      className="w-full px-1 text-left hover:text-blue-500"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </button>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem>
                <button
                  disabled={isLoading}
                  className="w-full px-1 text-left hover:text-red-500"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Skeleton className="h-12 w-full rounded-lg" />
      )}
    </>
  );
}
