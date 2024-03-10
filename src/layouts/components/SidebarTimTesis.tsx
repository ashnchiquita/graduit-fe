// Library imports
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Local imports
import Logo from "@/assets/logo.svg";

// Component imports
import SidebarContentTimTesis from "./SidebarContentTimTesis";
import Profile from "./Profile";
import Combobox from "@/components/ui/combobox";

export default function SidebarTimTesis(): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <aside className={`relative flex h-full w-[348px] py-1 pl-1`}>
      <nav className="relative z-10 flex size-full flex-col items-center justify-between rounded-lg bg-white px-4 py-5">
        <div className="flex size-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={Logo} alt="Logo" className="ml-2 size-7" />
                <h1 className="font-['Urbanist'] text-2xl font-bold">
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
            <SidebarContentTimTesis />
          </div>
          {/* Profile */}
          <Profile handleLogout={handleLogout} />
        </div>
      </nav>
    </aside>
  );
}
