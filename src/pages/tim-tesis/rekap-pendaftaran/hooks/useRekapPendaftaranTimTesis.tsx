import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RowAction from "../components/RowAction";
import { Mahasiswa, RekapPendaftaranTimTesisHookRet } from "../types";

export default function useRekapPendaftaranTimTesis(): RekapPendaftaranTimTesisHookRet {
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

  const [data, setData] = useState<Mahasiswa[]>([
    {
      nim: "23521149",
      nama: "Rava James Maulana",
      dosenPembimbing: "Dr. Johnny Rava Maulana",
      status: StatusPendaftaranEnum.ACCEPTED,
    },
    {
      nim: "23521148",
      nama: "Maulana James Rava",
      dosenPembimbing: "Dr. Johnny Rava Maulana",
      status: StatusPendaftaranEnum.PROCESS,
    },
    {
      nim: "23521147",
      nama: "James Rava Maulana",
      dosenPembimbing: "Dr. Johnny Rava Maulana",
      status: StatusPendaftaranEnum.REJECTED,
    },
    {
      nim: "23521146",
      nama: "Rava James Maulana",
      dosenPembimbing: "Dr. Johnny Rava Maulana",
      status: StatusPendaftaranEnum.ACCEPTED,
    },
    {
      nim: "23521145",
      nama: "Maulana James Rava",
      dosenPembimbing: "Dr. Johnny Rava Maulana",
      status: StatusPendaftaranEnum.PROCESS,
    },
  ]);

  const handleStatusFilterChange = (value: string) => {
    const obj: any = {};
    value && value !== "semua" && (obj.filter = value);
    searchValue && (obj.search = searchValue);

    setSearchParams(obj);
    setStatusFilter(value);
  };

  const columns: ColumnDef<Mahasiswa>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
      enableSorting: false,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
    },
    {
      header: "Dosen Pembimbing",
      accessorKey: "dosenPembimbing",
      enableSorting: false,
    },
    {
      header: "Status Pengajuan",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => (
        <StatusPendaftaranBadge status={row.original.status} />
      ),
    },
    {
      id: "aksi",
      cell: ({ row }) => <RowAction row={row} setData={setData} />,
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
