import { useEffect, useState } from "react";
import { IoSchoolOutline } from "react-icons/io5";
import { VscChevronRight, VscInfo, VscNotebook } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";

// Define a type for navigation items
interface NavItem {
  label: string;
  icon?: JSX.Element;
  path?: string;
  children?: NavItem[];
}

// Sample navigation data
const navItems: NavItem[] = [
  {
    label: "Tesis",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      { label: "Registrasi", path: "/tesis/registrasi" },
      { label: "Status", path: "/tesis/status" },
      { label: "Rekap", path: "/tesis/rekap" },
    ],
  },
  {
    label: "Tugas",
    icon: <VscNotebook className="text-slate-700" />,
    children: [
      { label: "Kelas", path: "/tugas/kelas" },
      { label: "Logbook", path: "/tugas/logbook" },
    ],
  },
  {
    label: "Informasi",
    icon: <VscInfo className="text-slate-700" />,
    children: [
      { label: "Seminar", path: "/informasi/seminar" },
      { label: "Pengujian", path: "/informasi/pengujian" },
    ],
  },
  {
    label: "Manajemen",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [{ label: "Kelola Akun", path: "/manajemen/kelola-akun" }],
  },
];

export default function SidebarContent(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setOpenGroups((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  // Set all groups to be open by default
  useEffect(() => {
    setOpenGroups(navItems.map((group) => group.label));
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex size-full max-h-[72vh] flex-col gap-4 overflow-auto">
          {navItems.map((group) => (
            <div key={group.label} className="flex w-full flex-col gap-1">
              <div
                className="flex w-full cursor-pointer items-center justify-between rounded px-1 py-1.5"
                onClick={() => toggleGroup(group.label)}
              >
                <div className="flex size-full items-center gap-4">
                  <div className="flex h-full items-center gap-2">
                    <div className="h-full w-[2px] rounded" />
                    {group.icon}
                  </div>
                  <p className="text-slate-700">{group.label}</p>
                </div>
                <VscChevronRight
                  className={`text-slate-700 transition-all duration-150 ${openGroups.includes(group.label) ? "rotate-90" : ""}`}
                />
              </div>
              {openGroups.includes(group.label) &&
                group.children?.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path || "#"}
                    children={({ isActive }) => (
                      <div
                        className={`flex size-full items-center justify-between rounded px-1 py-1.5 ${isActive ? "bg-slate-100 text-blue-900" : ""}`}
                      >
                        <div className="flex size-full items-center gap-10">
                          <div className="flex h-full items-center gap-2">
                            {isActive ? (
                              <div className="h-full w-[2px] rounded bg-blue-900" />
                            ) : (
                              <div className="h-full w-[2px] rounded" />
                            )}
                          </div>
                          <p>{item.label}</p>
                        </div>
                      </div>
                    )}
                  />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}
    </>
  );
}
