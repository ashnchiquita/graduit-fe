import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import JenisSidangBadge from "../components/JenisSidangBadge";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RowAction from "../components/RowAction";
import {
  ApprovalPendaftaranTopik,
  RekapPendaftaranTimTesisHookRet,
} from "../types";
import useSWR from "swr";
import {
  getRekapPendaftaranTable,
} from "../clients";
import { toast } from "react-toastify";
import { RoleEnum } from "@/types/session-data";
import { convertStatus } from "../../helper";
// import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";


export default function useApprivalPendaftaranTimTesis(): RekapPendaftaranTimTesisHookRet {
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

  const columns: ColumnDef<ApprovalPendaftaranTopik>[] = [
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
      header: "Jenis Sidang",
      accessorKey: "tipe",
      enableSorting: false,
      cell: ({ row }) => (
        <JenisSidangBadge jenis={row.original.tipe} />
      ),
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

  const { data: s2MahasiswaData = [], mutate: mutateTable } = useSWR<
    ApprovalPendaftaranTopik[]
  >("/registrasi-tesis", async () => {
    try {
      const response = await getRekapPendaftaranTable({
        view: RoleEnum.S2_TIM_TESIS,
        page: page,
        search: searchValue,
      });

      // Map GetRekapPendaftaranTableRes to PendaftaranTopik
      const data = response.data.data.map((item) => ({
        id: item.mahasiswa_id,
        nim: item.nim,
        nama: item.mahasiswa_nama,
        tipe: item.tipe,
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
    mutateTable();
  };

  // const dummyData: ApprovalPendaftaranTopik[] = [
  //   {
  //     id: "1",
  //     nim: "20210001",
  //     nama: "John Doe",
  //     tipe: "Sidang Seminar",
  //     dosenPembimbing: "Jane Smith",
  //     status: StatusPendaftaranEnum.ACCEPTED,
  //   },
  //   {
  //     id: "2",
  //     nim: "20210002",
  //     nama: "Alice Johnson",
  //     tipe: "Sidang Tesis",
  //     dosenPembimbing: "Bob Anderson",
  //     status: StatusPendaftaranEnum.PROCESS,
  //   },
  //   {
  //     id: "2",
  //     nim: "20210002",
  //     nama: "Alice Johnson",
  //     tipe: "Seminar Proposal",
  //     dosenPembimbing: "Bob Anderson",
  //     status: StatusPendaftaranEnum.REJECTED,
  //   },
  // ];

  

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
    refreshData,
  };
}
