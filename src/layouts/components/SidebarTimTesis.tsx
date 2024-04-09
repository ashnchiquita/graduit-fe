// Local imports
import Logo from "@/assets/logo.svg";

// Component imports
import SidebarContentTimTesis from "./SidebarContentTimTesis";
import Profile from "./Profile";
import Combobox from "../../components/ui/combobox";

interface SidebarTimTesisProps {
  closed: boolean;
}

export default function SidebarTimTesis({
  closed,
}: SidebarTimTesisProps): JSX.Element {
  const sidebarClasses = closed
    ? "fixed left-[-100%] md:relative md:w-0 pointer-events-none"
    : "fixed left-0 z-40 md:relative pointer-events-auto";

  return (
    <aside
      className={`${sidebarClasses} mt-[45px] size-full h-[calc(100vh-45px)] transition-all duration-500 ease-in-out md:mt-0 md:h-full md:w-[348px] md:py-1 md:pl-1`}
    >
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
          <Profile />
        </div>
      </nav>
    </aside>
  );
}
