import { useEffect, useState } from "react";
import { IoClipboardOutline, IoSchoolOutline } from "react-icons/io5";
import {
  VscChevronRight,
  VscInfo,
  VscNotebook,
  VscPieChart,
} from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";

// Define a type for navigation items
interface NavItem {
  label: string;
  icon?: JSX.Element;
  iconActive?: JSX.Element;
  path?: string;
  children?: NavItem[];
}

// Sample navigation data
const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <VscPieChart className="text-slate-700" />,
    iconActive: <VscPieChart className="text-blue-900" />,
    path: "/dashboard",
  },
  {
    label: "Pendaftaran",
    icon: <VscNotebook className="text-slate-700" />,
    children: [{ label: "Rekap Pendaftaran", path: "/rekap-pendaftaran" }],
  },
  // {
  //   label: "Tesis",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Registrasi", path: "/tesis/registrasi" },
  //     { label: "Status", path: "/tesis/status" },
  //     { label: "Rekap", path: "/tesis/rekap" },
  //   ],
  // },
  // {
  //   label: "Tugas Akhir",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Topik", path: "/tugas-akhir/topik/2" },
  //     { label: "Status", path: "/tugas-akhir/status/1" },
  //     { label: "Pengumuman", path: "/tugas-akhir/pengumuman" },
  //     { label: "Penjadwalan", path: "/tugas-akhir/penjadwalan" },
  //   ],
  // },
  // {
  //   label: "Tugas",
  //   icon: <VscNotebook className="text-slate-700" />,
  //   children: [
  //     { label: "Kelas", path: "/tugas/kelas" },
  //     { label: "Logbook", path: "/tugas/logbook" },
  //   ],
  // },
  // {
  //   label: "Informasi",
  //   icon: <VscInfo className="text-slate-700" />,
  //   children: [
  //     { label: "Seminar", path: "/informasi/seminar" },
  //     { label: "Pengujian", path: "/informasi/pengujian" },
  //   ],
  // },
  // {
  //   label: "Log",
  //   icon: <IoClipboardOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Bimbingan", path: "/log/bimbingan" },
  //     { label: "Sistem", path: "/log/sistem" },
  //   ],
  // },
  {
    label: "Manajemen",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      { label: "Kelola Akun", path: "/manajemen/kelola-akun" },
      { label: "Role Pengguna", path: "/manajemen/role-pengguna" },
      {
        label: "Periode Pendidikan",
        path: "/manajemen/periode-pendidikan",
      },
    ],
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

  useEffect(() => {
    setOpenGroups(navItems.map((group) => group.label));
  }, []);

  return (
    <>
      {!loading ? (
        <div className="z-[99] flex size-full max-h-[72vh] flex-col gap-4 overflow-auto pr-1">
          {navItems.map((group) => (
            <div key={group.label} className="flex w-full flex-col gap-1">
              {/* Check if group has children to decide rendering logic */}
              {group.children ? (
                <>
                  <div
                    className="flex w-full cursor-pointer items-center justify-between rounded px-1 py-1.5"
                    onClick={() => toggleGroup(group.label)}
                  >
                    <div className="flex size-full items-center gap-4">
                      <div className="flex h-full items-center gap-2">
                        <div className="h-full w-[2px] rounded" />
                        {group.icon}
                      </div>
                      <p className="text-base text-slate-700">{group.label}</p>
                    </div>
                    <VscChevronRight
                      className={`text-base text-slate-700 transition-all duration-150 ${openGroups.includes(group.label) ? "rotate-90" : ""}`}
                    />
                  </div>
                  {openGroups.includes(group.label) &&
                    group.children.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path || "#"}
                        children={({ isActive }) => (
                          <div
                            className={`flex size-full items-center justify-between rounded px-1 py-1.5 ${
                              isActive ? "bg-slate-100 text-blue-900" : ""
                            }`}
                          >
                            <div className="flex size-full items-center gap-10">
                              <div className="flex h-full items-center gap-2">
                                {isActive ? (
                                  <div className="h-full w-[2px] rounded bg-blue-900" />
                                ) : (
                                  <div className="h-full w-[2px] rounded" />
                                )}
                              </div>
                              <p className="text-base">{item.label}</p>
                            </div>
                          </div>
                        )}
                      />
                    ))}
                </>
              ) : (
                // Render standalone menu items (without children)
                <NavLink
                  to={group.path || "#"}
                  children={({ isActive }) => (
                    <div
                      className={`flex size-full items-center justify-between rounded px-1 py-1.5 ${
                        isActive ? "bg-slate-100 text-blue-900" : ""
                      }`}
                    >
                      <div className="flex size-full items-center gap-4">
                        <div className="flex h-full items-center gap-2">
                          {isActive ? (
                            <>
                              <div className="h-full w-[2px] rounded bg-blue-900" />
                              {group.iconActive}
                            </>
                          ) : (
                            <>
                              <div className="h-full w-[2px] rounded" />
                              {group.icon}
                            </>
                          )}
                        </div>
                        <p className="text-base">{group.label}</p>
                      </div>
                    </div>
                  )}
                />
              )}
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
