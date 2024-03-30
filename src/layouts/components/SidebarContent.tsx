import { VscChevronRight } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import { NAV_ITEMS } from "../constants/nav-item";
import useSidebarContent from "../hooks/useSidebarContent";

export default function SidebarContent(): JSX.Element {
  const { toggleGroup, openGroups, loading, session } = useSidebarContent();

  return (
    <>
      {!loading ? (
        <div className="z-[99] flex size-full max-h-[72vh] flex-col gap-4 overflow-auto pr-1">
          {NAV_ITEMS.map(
            (group) =>
              group.roleAccess.some((role) =>
                session?.roles.includes(role),
              ) && (
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
                          <p className="text-base text-slate-700">
                            {group.label}
                          </p>
                        </div>
                        <VscChevronRight
                          className={`text-base text-slate-700 transition-all duration-150 ${openGroups.includes(group.label) ? "rotate-90" : ""}`}
                        />
                      </div>
                      {openGroups.includes(group.label) &&
                        group.children.map(
                          (item) =>
                            item.roleAccess.some((role) =>
                              session?.roles.includes(role),
                            ) && (
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
                                      <p className="text-base">{item.label}</p>
                                    </div>
                                  </div>
                                )}
                              />
                            ),
                        )}
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
              ),
          )}
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
