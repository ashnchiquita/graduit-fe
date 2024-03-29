import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  BimbinganData,
  BimbinganLogs,
  LogBimbinganMahasiswaHookRet,
} from "../types";
import { useEffect, useState } from "react";
import DownloadBox from "../components/DownloadBox";
import StatusCircle from "../components/StatusCircle";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getLogBimbinganS2 } from "../clients";

export default function useLogBimbinganMahasiswa(): LogBimbinganMahasiswaHookRet {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const { id, strata } = useParams();

  const defaultData: BimbinganData = {
    bimbingan: [],
    mahasiswa: {
      name: "",
      email: "",
      major: "",
    },
    topik: {
      judul: "",
      deskripsi: "",
    },
  };
  const { data = defaultData } = useSWR(`/bimbingan/${id}`, async () => {
    let data: BimbinganData;

    if (strata?.toUpperCase() === "S1") {
      // TODO: Update this to fetch from S1 service
      const res = await getLogBimbinganS2(id ?? "");

      data = {
        bimbingan: res.data.bimbingan.map((item) => ({
          tanggal: item.waktuBimbingan,
          laporan_kemajuan: item.laporanKemajuan,
          todo: item.todo,
          rencana: item.bimbinganBerikutnya,
          berkas: item.berkasLinks,
          status: true,
        })),
        mahasiswa: {
          name: res.data.mahasiswa.nama,
          email: res.data.mahasiswa.email,
          major: res.data.mahasiswa.jalurPilihan,
        },
        topik: {
          judul: res.data.topik.judul,
          deskripsi: res.data.topik.deskripsi,
        },
      };
    } else {
      const res = await getLogBimbinganS2(id ?? "");

      data = {
        bimbingan: res.data.bimbingan.map((item) => ({
          tanggal: item.waktuBimbingan,
          laporan_kemajuan: item.laporanKemajuan,
          todo: item.todo,
          rencana: item.bimbinganBerikutnya,
          berkas: item.berkasLinks,
          status: true,
        })),
        mahasiswa: {
          name: res.data.mahasiswa.nama,
          email: res.data.mahasiswa.email,
          major: res.data.mahasiswa.jalurPilihan,
        },
        topik: {
          judul: res.data.topik.judul,
          deskripsi: res.data.topik.deskripsi,
        },
      };
    }

    return data;
  });

  const columns: ColumnDef<BimbinganLogs>[] = [
    {
      header: "Tanggal",
      accessorKey: "tanggal",
      minSize: 1000,
    },
    {
      header: "Laporan Kemajuan",
      accessorKey: "laporan_kemajuan",
      minSize: 1000,
    },
    {
      header: "To-do",
      accessorKey: "todo",
      minSize: 1000,
    },
    {
      header: "Rencana",
      accessorKey: "rencana",
      minSize: 1000,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      cell: ({ row }) => <DownloadBox row={row} />,
      minSize: 1000,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusCircle row={row} />,
      minSize: 1000,
      enableSorting: false,
    },
  ];

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
    data: data.bimbingan,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  return {
    table,
    mahasiswaData: data.mahasiswa,
    topik: data.topik,
    searchValue,
    handleSearchValueChange,
  };
}
