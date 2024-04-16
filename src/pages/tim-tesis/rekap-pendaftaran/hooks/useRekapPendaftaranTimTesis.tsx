import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RowAction from "../components/RowAction";
import {
  GetStatisticsRes,
  Mahasiswa,
  RekapPendaftaranTimTesisHookRet,
} from "../types";
import useSWR from "swr";
import {
  getRekapPendaftaranStatistics,
  getRekapPendaftaranTable,
} from "../clients";
import { toast } from "react-toastify";
import { RoleEnum } from "@/types/session-data";
import { convertStatus } from "../helper";

const defaultStatistics: GetStatisticsRes = {
  diterima: {
    amount: 0,
    percentage: null,
  },
  sedang_proses: {
    amount: 0,
    percentage: null,
  },
  ditolak: {
    amount: 0,
    percentage: null,
  },
};

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
      cell: ({ row }) => <RowAction row={row} setData={() => {}} />,
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const { data: statisticsData } = useSWR<GetStatisticsRes>(
    "/registrasi-tesis/statistics",
    async () => {
      try {
        const response = await getRekapPendaftaranStatistics({
          view: RoleEnum.S2_TIM_TESIS,
        });
        return response.data;
      } catch (error) {
        toast.error("Gagal memuat data statistik");
        return defaultStatistics;
      }
    },
    {
      fallbackData: defaultStatistics,
    },
  );

  // Get page number from search params
  const page = Number(searchParams.get("page")) || 1;

  const { data: s2MahasiswaData = [] } = useSWR<Mahasiswa[]>(
    "/registrasi-tesis",
    async () => {
      try {
        const response = await getRekapPendaftaranTable({
          view: RoleEnum.S2_TIM_TESIS,
          page: page,
        });

        // Map GetRekapPendaftaranTableRes to Mahasiswa
        const data = response.data.data.map((item) => ({
          nim: item.nim,
          nama: item.mahasiswa_nama,
          dosenPembimbing: item.pembimbing_nama,
          status: convertStatus(item.status),
        }));

        return data;
      } catch (error) {
        toast.error("Gagal memuat data tabel");
        return [];
      }
    },
  );

  const table = useReactTable({
    columns,
    data: s2MahasiswaData,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
    statisticsData: statisticsData ?? defaultStatistics,
  };
}
