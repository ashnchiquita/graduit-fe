import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import {
  getLogBimbinganS2,
  getLogBimbinganS1,
  getMahasiswaInfoS1,
} from "../clients";
import DownloadBox from "../components/DownloadBox";
import StatusCircle from "../components/StatusCircle";
import {
  BimbinganData,
  BimbinganLogs,
  Berkas,
  BimbinganS1Res,
  LogBimbinganMahasiswaHookRet,
} from "../types";

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
      const resBimbingan = await getLogBimbinganS1(id ?? "");
      const resMahasiswa = await getMahasiswaInfoS1(id ?? "");

      console.log(resBimbingan);

      data = {
        bimbingan: resBimbingan.data.data.map((item: BimbinganS1Res) => ({
          id: item.id,
          tanggal: item.date,
          laporan_kemajuan: item.laporan_kemajuan,
          todo: item.todo,
          rencana: item.next_bimbingan,
          berkas: item.berkas.map((berkasItem: Berkas) => ({
            nama: berkasItem.nama,
            link: berkasItem.link,
          })),
          status: item.status,
        })),
        mahasiswa: {
          name: resMahasiswa.data.data.nama,
          email: resMahasiswa.data.data.email,
          major: resMahasiswa.data.data.jalur_pilihan,
        },
        topik: {
          judul: resMahasiswa.data.data.judul,
          deskripsi: resMahasiswa.data.data.deskripsi,
        },
      };
      console.log(data);
    } else {
      const res = await getLogBimbinganS2(id ?? "");

      data = {
        bimbingan: res.data.bimbingan.map((item) => ({
          id: item.id,
          tanggal: item.waktuBimbingan,
          laporan_kemajuan: item.laporanKemajuan,
          todo: item.todo,
          rencana: item.bimbinganBerikutnya,
          berkas: item.berkas.map((berkasItem: Berkas) => ({
            nama: berkasItem.nama,
            link: berkasItem.link,
          })),
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
      header: "Rencana",
      accessorKey: "todo",
      minSize: 1000,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      cell: ({ row }) => <DownloadBox row={row} />,
      minSize: 1000,
    },
    {
      header: "Status Bimbingan",
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
    columnResizeMode: "onChange",
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
