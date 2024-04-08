import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Mahasiswa, RekapPendaftaranDosbimHookRet } from "../types";
import { formatDate } from "@/lib/dateformat";
import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import RowAction from "../components/RowAction";
import WawancaraModal from "../components/WawancaraModal";
import { useSearchParams } from "react-router-dom";

export default function useRekapPendaftaranDosbim(): RekapPendaftaranDosbimHookRet {
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

  const handleStatusFilterChange = (value: string) => {
    const obj: any = {};
    value && value !== "semua" && (obj.filter = value);
    searchValue && (obj.search = searchValue);

    setSearchParams(obj);
    setStatusFilter(value);
  };

  const [data, setData] = useState<Mahasiswa[]>([
    {
      nim: "23521149",
      nama: "Rava James Maulana",
      jadwalWawancara: new Date("2003-03-14"),
      status: StatusPendaftaranEnum.ACCEPTED,
    },
    {
      nim: "23521148",
      nama: "Maulana James Rava",
      jadwalWawancara: null,
      status: StatusPendaftaranEnum.PROCESS,
    },
    {
      nim: "23521147",
      nama: "James Rava Maulana",
      jadwalWawancara: new Date("2003-03-14"),
      status: StatusPendaftaranEnum.REJECTED,
    },
  ]);

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
      header: "Jadwal Wawancara",
      accessorKey: "jadwalWawancara",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.jadwalWawancara ? (
          <span className="text-xs font-bold">
            {formatDate(row.original.jadwalWawancara)}
          </span>
        ) : (
          <span className="text-xs font-medium text-red-400">Belum Ada</span>
        ),
    },
    {
      id: "ubah_jadwal",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.status === StatusPendaftaranEnum.PROCESS ? (
          <WawancaraModal
            dateInit={row.original.jadwalWawancara}
            setData={setData}
            nim={row.original.nim}
          />
        ) : null,
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
