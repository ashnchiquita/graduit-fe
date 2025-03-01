import { useSearchParams } from "react-router-dom";
import { getDaftarKelas } from "../client";
import { RoleEnum } from "@/types/session-data";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useSWR from "swr";
import useSession from "@/hooks/useSession";

export default function useDaftarKelas() {
  const [rawSearchParams] = useSearchParams({});
  const searchParams = useDebounce(rawSearchParams, 1000);
  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");
  const [viewVal] = useState(searchParams.get("view") as RoleEnum);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  const handleSearchValChange = (value: string) => {
    setSearchVal(value);
  };

  const { data, isLoading, mutate } = useSWR(
    `/daftar-kelas?view=${viewVal}&search=${searchVal}`,
    async () => {
      const res = await getDaftarKelas(viewVal, searchVal);
      return res.data;
    },
  );

  useEffect(() => {
    searchParams.set("search", searchVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  useEffect(() => {
    searchParams.set("view", viewVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewVal]);

  const refreshData = () => {
    mutate();
  };

  return {
    data,
    sessionData,
    isLoading,
    viewVal,
    searchVal,
    handleSearchValChange,
    dialogOpen,
    setDialogOpen,
    refreshData,
  };
}
