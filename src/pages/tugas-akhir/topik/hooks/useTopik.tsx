import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { Topic } from "../types";
import { getAllTopics } from "../cleints";

export default function useTopik() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("/form-pendaftaran-topik");
  };

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  const { data = [], mutate: fetchData } = useSWR(
    "/api/admin/alokasi-topik",
    async () => {
      const res = await getAllTopics({
        search: searchValue === "" ? undefined : searchValue,
      });

      const data: Topic[] = res.data.data.map((resTopic) => ({
        id: resTopic.id,
        id_lecturer: resTopic.id_lecturer,
        lect_name: resTopic.lect_name,
        title: resTopic.title,
        description: resTopic.description,
      }));

      return data;
    },
  );

  const columns: ColumnDef<Topic>[] = [
    {
      header: "Nama Topik",
      accessorKey: "title",
    },
    {
      header: "Deskripsi",
      accessorKey: "description",
    },
    {
      header: "Dosen Pengaju",
      accessorKey: "lect_name",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    onClickCreate,
  };
}
