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
import useSWR from "swr";
import { getKelasDosen, getKelasMhs } from "../clients";

export default function useAssignKelas(type: "DOSEN" | "MAHASISWA") {
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

  const { data = [] } = useSWR(
    `/kelas/${type.toLowerCase()}`,
    async (): Promise<KelasPengguna[]> => {
      const { data } =
        type === "MAHASISWA" ? await getKelasMhs() : await getKelasDosen();
      return data;
    },
  );

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
