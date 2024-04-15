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

const dummySystemLogs: SystemLogs[] = [
  {
    id: "1",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "2",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "3",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "4",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "5",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "6",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "7",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "8",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "9",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "10",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "11",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "12",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "13",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "14",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "15",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "16",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "17",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "18",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "19",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "20",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "21",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "22",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
];

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

export default function LogSistem() {
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
    data: dummySystemLogs,
    columns,
    columnResizeMode: "onChange",
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

  // TODO remove boilerplate prop examples (search value & onclicks)
  return (
    <main className="flex min-h-screen flex-col p-5">
      <p className="mb-10 text-5xl font-black">System Logs</p>
      <DataTable
        table={table}
        headline="hi"
        description="hellow"
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchPlaceholder="Search something"
      />
    </main>
  );
}
