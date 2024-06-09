import { VscChevronRight } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import { NAV_ITEMS } from "../constants/nav-item";
import useSidebarContent from "../hooks/useSidebarContent";
import { RoleEnum } from "@/types/session-data";

const roleHeaders = {
  [RoleEnum.S2_TIM_TESIS]: "Tim Tesis S2",
  [RoleEnum.S1_TIM_TA]: "Tim TA S1",
  [RoleEnum.S1_PEMBIMBING]: "Pembimbing S1",
  [RoleEnum.S2_PEMBIMBING]: "Pembimbing S2",
  [RoleEnum.S1_MAHASISWA]: "Mahasiswa S1",
  [RoleEnum.S2_MAHASISWA]: "Mahasiswa S2",
  [RoleEnum.ADMIN]: "Administrator",
  [RoleEnum.TU]: "Tata Usaha",
  [RoleEnum.S1_PENGUJI]: "Penguji S1",
  [RoleEnum.S2_PENGUJI]: "Penguji S2",
};

export default function SidebarContent(): JSX.Element {
  const { toggleGroup, openGroups, loading, session } = useSidebarContent();

  const uniqueRoles = Array.from(new Set(session?.roles || []));
  const renderedItems = new Set();

  return (
    <>
      {!loading ? (
        <div className="z-[99] flex size-full max-h-[72vh] flex-col gap-4 overflow-auto pr-1">
          {uniqueRoles.map((role) => {
            const roleNavItems = NAV_ITEMS.filter((group) =>
              group.roleAccess.includes(role),
            ).filter((group) => !renderedItems.has(group.label));

            if (roleNavItems.length === 0) {
              return null;
            }

            return (
              <div key={role}>
                <div className="mb-2 text-sm font-bold text-slate-700">
                  {roleHeaders[role]}
                </div>
                {roleNavItems.map((group) => {
                  if (renderedItems.has(group.label)) {
                    return null;
                  }
                  renderedItems.add(group.label);

                  return (
                    <div
                      key={group.label}
                      className="flex w-full flex-col gap-1"
                    >
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
                              <p className="text-base text-slate-700">
                                {group.label}
                              </p>
                            </div>
                            <VscChevronRight
                              className={`text-base text-slate-700 transition-all duration-150 ${
                                openGroups.includes(group.label)
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </div>
                          {openGroups.includes(group.label) &&
                            group.children.map((item) => {
                              if (renderedItems.has(item.label)) {
                                return null;
                              }
                              renderedItems.add(item.label);

                              return (
                                item.roleAccess.includes(role) && (
                                  <NavLink
                                    key={item.label}
                                    to={item.path || "#"}
                                    children={({ isActive }) => (
                                      <div
                                        className={`flex size-full items-center justify-between rounded px-1 py-1.5 ${
                                          isActive
                                            ? "bg-slate-100 text-blue-900"
                                            : ""
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
                                          <p className="text-base">
                                            {item.label}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  />
                                )
                              );
                            })}
                        </>
                      ) : (
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
                  );
                })}
              </div>
            );
          })}
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
