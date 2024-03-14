"use client";
import { DataTable } from "@/components/DataTable";
import type { SystemLogs } from "@/lib/entity";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columns: ColumnDef<SystemLogs>[] = [
  {
    header: "User ID",
    accessorKey: "id",
    minSize: 1000,
  },
  {
    header: "Action",
    accessorKey: "action",
    minSize: 1000,
  },
  {
    header: "Time Stamp",
    accessorKey: "createdAt",
    minSize: 1000,
  },
];

export default function LogBimbinganMahasiswa() {
  const data: SystemLogs[] = [
    {
      id: "1",
      idPengguna: "2",
      action: "Ada deh",
      createdAt: "02/03/2024 19:58",
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: false,
    },
  ]);

  useEffect(() => {
    console.log(sorting);
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="flex min-h-screen flex-col p-5">
      <DataTable
        table={table}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </main>
  );
}
