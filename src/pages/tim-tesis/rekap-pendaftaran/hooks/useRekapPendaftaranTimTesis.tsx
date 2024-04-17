import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RowAction from "../components/RowAction";
import {
  GetStatisticsRes,
  PendaftaranTopik,
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
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const handleSearchValueChange = (value: string) => {
    const obj: any = {};
    value && (obj.search = value);

    setSearchParams(obj);
    setSearchValue(value);
  };

  const columns: ColumnDef<PendaftaranTopik>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enableSorting: false,
      enableHiding: true,
    },
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
      cell: ({ row }) => <RowAction row={row} />,
      enableSorting: false,
      meta: {
        align: "right",
      },
    },
  ];

  const { data: statisticsData, mutate: mutateStats } =
    useSWR<GetStatisticsRes>(
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

  const { data: s2MahasiswaData = [], mutate: mutateTable } = useSWR<
    PendaftaranTopik[]
  >("/registrasi-tesis", async () => {
    try {
      const response = await getRekapPendaftaranTable({
        view: RoleEnum.S2_TIM_TESIS,
        page: page,
        search: searchValue,
      });

      // Map GetRekapPendaftaranTableRes to Mahasiswa
      const data = response.data.data.map((item) => ({
        id: item.mahasiswa_id,
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
  });

  const refreshData = () => {
    mutateStats();
    mutateTable();
  };

  const table = useReactTable({
    columns,
    data: s2MahasiswaData,
    state: {
      columnVisibility: {
        id: false,
      },
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  // On search change
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      mutateTable();
      setPage(1);
    }, 500);

    return () => clearTimeout(debouncedSearch);
  }, [searchValue, mutateTable]);

  return {
    table,
    searchValue,
    handleSearchValueChange,
    statisticsData: statisticsData ?? defaultStatistics,
    refreshData,
  };
}
