import { useEffect, useState } from "react";
import { SidebarContentHookRet } from "../types";
import { NAV_ITEMS } from "../constants/nav-item";
import useSWR from "swr";
import { getSession } from "../clients";

export default function useSidebarContent(): SidebarContentHookRet {
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const { data: session = null, isLoading: loading } = useSWR(
    "/session",
    async () => {
      const res = await getSession();

      return res.data;
    },
  );

  const toggleGroup = (label: string) => {
    setOpenGroups((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  useEffect(() => {
    setOpenGroups(NAV_ITEMS.map((group) => group.label));
  }, []);

  return {
    session,
    toggleGroup,
    openGroups,
    loading,
  };
}
