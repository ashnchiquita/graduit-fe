import Logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  closed: boolean;
}

export default function Sidebar({ closed }: SidebarProps): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <aside
      className={cn(
        closed
          ? "fixed left-[-100%] md:relative md:w-[0px]"
          : "fixed left-0 md:relative md:w-[348px]",
        "mt-[45px] size-full h-[calc(100vh-45px)] transition-all duration-500 ease-in-out md:mt-0 md:h-full md:py-1 md:pl-1 z-[99]",
      )}
    >
      <nav className="relative flex h-full flex-col items-center justify-between bg-white px-4 py-5 md:h-full md:rounded-lg">
        <div className="flex size-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="hidden w-full items-center justify-between md:flex">
              <div className="flex items-center gap-2">
                <img
                  src={Logo}
                  alt="Logo"
                  className="ml-2 size-5 transition-all duration-100 lg:size-6"
                />
                <h1 className="font-['Urbanist'] text-xl font-bold transition-all duration-100 lg:text-2xl">
                  GraduIT
                </h1>
              </div>
            </div>
            {/* Sidebar Content */}
            <SidebarContent />
          </div>
          {/* Profile */}
          <Profile handleLogout={handleLogout} />
        </div>
      </nav>
    </aside>
  );
}
