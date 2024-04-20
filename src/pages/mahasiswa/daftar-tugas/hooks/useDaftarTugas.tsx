import { useSearchParams } from "react-router-dom";
import { Tugas } from "../types";
import { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function useDaftarTugas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("filter") ?? "",
  );

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);
    statusFilter && statusFilter !== "semua" && (obj.filter = statusFilter);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const [data, setData] = useState<Tugas[]>([
    {
      nomor: 1,
      kodeMataKuliah: "IF123",
      namaMataKuliah: "Pemrograman Web",
      judul: "Tugas 1",
      start: "2021-01-01",
      end: "2021-01-10",
      statusPengerjaan: "Selesai",
      submisi: {
        isSubmitted: true,
        submissionId: "1",
      },
    },
    {
      nomor: 2,
      kodeMataKuliah: "IF123",
      namaMataKuliah: "Pemrograman Web",
      judul: "Tugas 2",
      start: "2021-01-01",
      end: "2021-01-10",
      statusPengerjaan: "Belum dikerjakan",
      submisi: {
        isSubmitted: false,
        submissionId: "2",
      },
    },
    {
      nomor: 3,
      kodeMataKuliah: "IF123",
      namaMataKuliah: "Pemrograman Web",
      judul: "Tugas 3",
      start: "2021-01-01",
      end: "2021-01-10",
      statusPengerjaan: "Belum dikerjakan",
    },
    {
      nomor: 4,
      kodeMataKuliah: "IF123",
      namaMataKuliah: "Pemrograman Web",
      judul: "Tugas 4",
      start: "2021-01-01",
      end: "2021-01-10",
      statusPengerjaan: "Selesai",
      submisi: {
        isSubmitted: true,
        submissionId: "4",
      },
    },
    {
      nomor: 5,
      kodeMataKuliah: "IF123",
      namaMataKuliah: "Pemrograman Web",
      judul: "Tugas 5",
      start: "2021-01-01",
      end: "2021-01-10",
      statusPengerjaan: "Selesai",
      submisi: {
        isSubmitted: true,
        submissionId: "5",
      },
    },
  ]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const columns: ColumnDef<Tugas>[] = [
    {
      header: "Nomor",
      accessorKey: "nomor",
      enableSorting: false,
      maxSize: 1,
    },
    {
      header: "Mata Kuliah",
      enableSorting: false,
      cell: ({ row }) =>
        `${row.original.kodeMataKuliah} - ${row.original.namaMataKuliah}`,
    },
    {
      header: "Judul",
      accessorKey: "judul",
      enableSorting: false,
      maxSize: 10,
    },
    {
      header: "Start",
      accessorKey: "start",
      enableSorting: false,
    },
    {
      header: "End",
      accessorKey: "end",
      enableSorting: false,
    },
    {
      header: "Status Pengerjaan",
      accessorKey: "statusPengerjaan",
      enableSorting: false,
    },
    {
      id: "aksi",
      cell: () => "Buka",
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
  };
}
