import { useEffect, useState } from "react";
import {
  VscCalendar,
  VscChevronRight,
  VscClippy,
  VscMegaphone,
  VscPieChart,
} from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";

interface NavItem {
  label: string;
  icon?: JSX.Element;
  path?: string;
  children?: NavItem[];
  expandable?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <VscPieChart className="" />,
    expandable: false,
  },
  {
    label: "Pengumuman",
    icon: <VscMegaphone className="" />,
    expandable: false,
  },
  {
    label: "Penjadwalan",
    icon: <VscCalendar className="text-slate-700" />,
    expandable: true,
    children: [
      { label: "jadwal 1", path: "" },
      { label: "jadwal 2", path: "" },
    ],
  },
  {
    label: "Log Audit",
    icon: <VscClippy className="text-slate-700" />,
    expandable: true,
    children: [
      { label: "log 1", path: "" },
      { label: "log 2", path: "" },
    ],
  },
];

export default function SidebarContentTimTesis(): JSX.Element {
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
                {group.expandable && (
                  <VscChevronRight
                    className={`text-slate-700 transition-all duration-150 ${openGroups.includes(group.label) ? "rotate-90" : ""}`}
                  />
                )}
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
