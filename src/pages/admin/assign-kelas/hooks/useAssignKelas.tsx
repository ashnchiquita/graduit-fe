import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { KelasPengguna } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { getKelasDosen, getKelasMhs } from "../clients";
import UbahKelasDialog from "../components/UbahKelasDialog";

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
    [`/kelas/${type.toLowerCase()}`, searchValue],
    async ([_, search]) => {
      const { data } =
        type === "MAHASISWA"
          ? await getKelasMhs(search)
          : await getKelasDosen(search);
      return data;
    },
  );
  const [tableData, setTableData] = useState<KelasPengguna[]>(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);

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
        <UbahKelasDialog
          searchValue={searchValue}
          table={table}
          type={type}
          title={`Ubah Kelas ${type.toLowerCase()}`}
          penggunaId={row.original.id}
          initKelas={row.original.kelas.map((k) => ({
            nama: `${k.mataKuliahNama} - K${k.nomor.toString().padStart(2, "0")}`,
            id: k.id,
          }))}
          disabled={table.getSelectedRowModel().rows.length > 1}
          dialogTrigger={
            <div className="flex w-full justify-center">
              <Button
                disabled={table.getSelectedRowModel().rows.length > 1}
                variant="ghost"
                className="text-xs text-blue-600"
              >
                Ubah Kelas
              </Button>
            </div>
          }
        />
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return { table, searchValue, handleSearchValueChange };
}
