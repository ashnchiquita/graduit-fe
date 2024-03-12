import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "@/assets/logo.svg";
import SidebarContent from "./SidebarContent";
import Profile from "./Profile";
import Combobox from "@/components/ui/combobox";

interface SidebarProps {
  closed: boolean;
}

export default function Sidebar({ closed }: SidebarProps): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    navigate("/");
  };

  const sidebarClasses = closed
    ? "fixed left-[-100%] md:relative md:w-[0px]"
    : "fixed left-0 z-40 md:relative";

  return (
    <aside
      className={`${sidebarClasses} mt-[45px] size-full h-[calc(100vh-45px)] transition-all duration-500 ease-in-out md:mt-0 md:h-full md:w-[348px] md:py-1 md:pl-1`}
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
              <Combobox
                placeholder="Tingkat"
                options={[
                  { value: "sarjana", label: "Sarjana" },
                  { value: "magister", label: "Magister" },
                ]}
                value="magister"
                onChange={(newValue) => console.log(newValue)}
                containerClassName="text-xs mt-0.5 px-2 h-7 rounded-lg bg-slate-100 font-medium text-blue-900 border-none"
                contentClassName="w-24"
                optionClassName="text-xs"
                searchBar={false}
              />
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
