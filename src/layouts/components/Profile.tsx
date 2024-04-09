// Library imports
import { useEffect, useState } from "react";
import loginInstance from "@/config/login-axios-config";

// Local imports
import { VscChevronRight } from "react-icons/vsc";
import LetteredAvatar from "@/components/ui/lettered-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";

interface User {
  name: string;
  role: string;
}

export default function Profile(): JSX.Element {
  // Component imports
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [profile, setProfile] = useState<User>({
    name: "Alisha Listya Wardhani",
    role: "Mahasiswa",
  });

  const handleLogout = async () => {
    try {
      await loginInstance.post("/auth/logout");
    } catch (error) {
      toast.error("Gagal logout");
    }
  };

  const fetchProfile = async () => {
    // TODO: Fetch user profile
    setProfile({
      name: "Alisha Listya Wardhani",
      role: "Mahasiswa",
    });
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-slate-100 p-2">
              {/* <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-slate-100 p-2"> */}
              <div className="flex items-center gap-3">
                <LetteredAvatar name={profile.name} />
                <div className="flex flex-col items-start">
                  <p className="text-xs font-medium">{profile.name}</p>
                  <p className="text-xs">{profile.role}</p>
                </div>
              </div>
              <VscChevronRight size={16} />
              {/* </button> */}
            </PopoverTrigger>

            <PopoverContent className="z-[99] flex w-full flex-col gap-2 px-0 py-2">
              <button
                disabled={loading}
                className="w-full px-4 text-left hover:text-red-500"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Skeleton className="h-12 w-full rounded-lg" />
      )}
    </>
  );
}
