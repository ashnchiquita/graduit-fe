"use client";
import { DataTable } from "@/components/DataTable";
import type { MahasiswaLogs } from "@/lib/entity";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import TagStatus from "./components/TagStatus";
import { Badge, ButtonDownload } from "./components/Table";

const columns: ColumnDef<MahasiswaLogs>[] = [
  {
    header: "Tanggal",
    accessorKey: "tanggal",
    minSize: 1000,
  },
  {
    header: "Laporan Kemajuan",
    accessorKey: "laporanKemajuan",
    minSize: 1000,
  },
  {
    header: "To-Do",
    accessorKey: "toDo",
    minSize: 1000,
  },
  {
    header: "Berkas",
    accessorKey: "berkas",
    minSize: 1000,
  },
  {
    header: "Status",
    accessorKey: "status",
    minSize: 1000,
  },
  {
    header: "Rencana",
    accessorKey: "rencana",
    minSize: 1000,
  },
];

export default function LogMahasiswa(): JSX.Element {
  const data: MahasiswaLogs[] = [
    {
      tanggal: "12/12/2024",
      laporanKemajuan: "lorem ipsum",
      toDo : "membantu orang tua",
      berkas : <ButtonDownload berkas={
      {
        nama:"oke",
        url:"google.com"
      }
      }/>,
      status: <Badge/>,
      rencana: "12/1/2025"
    }
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
    <div className="flex flex-col gap-4 px-4 pb-20">
      <TagStatus status="SAH" />
      <DataTable
        headline="Log Bimbingan"
        table={table}
        onClickDelete={()=>{console.log("DELETE")}}
        onClickFilter={()=>{console.log("FILTER")}}
      />
    </div>
  );
}
