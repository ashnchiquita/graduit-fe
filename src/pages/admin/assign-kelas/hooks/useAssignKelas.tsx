import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { KelasPengguna } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function useAssignKelas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const [data] = useState<KelasPengguna[]>([
    {
      id: "1",
      email: "23521149@std.stei.itb.ac.id",
      nama: "Rava James Maulana",
      kelas: [
        {
          nomor: 1,
          mataKuliahKode: "IF3270",
        },
        {
          nomor: 2,
          mataKuliahKode: "IF3270",
        },
      ],
    },
    {
      id: "3",
      email: "23521147@std.stei.itb.ac.id",
      nama: "Maulana James",
      kelas: [],
    },
    {
      id: "2",
      email: "23521148@std.stei.itb.ac.id",
      nama: "James Rava Maulana",
      kelas: [
        {
          nomor: 1,
          mataKuliahKode: "IF3270",
        },
      ],
    },
  ]);

  const columns: ColumnDef<KelasPengguna>[] = [
    {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="bg-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      enableSorting: false,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
    },
    {
      header: "Mata Kuliah",
      accessorKey: "kelas",
      cell: ({ row }) => (
        <ul className="mr-0 flex w-full flex-col">
          {row.original.kelas.length > 0
            ? row.original.kelas.map((kelas, index) => (
                <li
                  key={index}
                  className="w-full border-b py-6 text-sm first:pt-2 last:border-none last:pb-2"
                >
                  {kelas.mataKuliahKode}
                </li>
              ))
            : "-"}
        </ul>
      ),
      enableSorting: false,
    },
    {
      header: "Kelas",
      accessorKey: "kelas",
      cell: ({ row }) => (
        <ul className="flex w-full flex-col">
          {row.original.kelas.length > 0
            ? row.original.kelas.map((kelas, index) => (
                <li
                  key={index}
                  className="w-full border-b py-6 text-sm first:pt-2 last:border-none last:pb-2"
                >
                  K{kelas.nomor.toString().padStart(2, "0")}
                </li>
              ))
            : "-"}
        </ul>
      ),
      enableSorting: false,
    },
    {
      header: () => <p className="w-full text-center">Aksi</p>,
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex w-full justify-center">
          <Button variant="ghost" className="text-xs text-blue-600">
            Ubah Kelas
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return { table, searchValue, handleSearchValueChange };
}
