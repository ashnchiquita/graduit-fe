import BerkasBadge from "@/components/BerkasBadge";
import { formatDateWithoutClock } from "@/pages/mahasiswa/add-log-bimbingan/utils";
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
  getLogBimbinganS1,
  getLogBimbinganS2,
  getMahasiswaInfoS1,
} from "../clients";
import StatusCircle from "../components/StatusCircle";
import {
  Berkas,
  BimbinganData,
  BimbinganLogs,
  BimbinganS1Res,
  LogBimbinganMahasiswaHookRet,
} from "../types";

export default function useLogBimbinganMahasiswa(): LogBimbinganMahasiswaHookRet {
  const { id, strata } = useParams();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultData: BimbinganData = {
    bimbingan: [],
    mahasiswa: {
      name: "",
      email: "",
      major: "",
      submissionTime: "",
    },
    topik: {
      judul: "",
      deskripsi: "",
    },
  };
  const { data = defaultData } = useSWR(`/bimbingan/${id}`, async () => {
    let data: BimbinganData;
    if (strata?.toLowerCase() === "s1") {
      const resBimbingan = await getLogBimbinganS1(
        id ?? "",
        pagination.pageSize,
        pagination.pageSize,
      );
      const resMahasiswa = await getMahasiswaInfoS1(id ?? "");
      data = {
        bimbingan: resBimbingan.data.data.map((item: BimbinganS1Res) => ({
          id: item.id,
          tanggal: formatDateWithoutClock(new Date(item.date)),
          laporan_kemajuan: item.laporan_kemajuan,
          todo: item.todo,
          rencana: formatDateWithoutClock(new Date(item.next_bimbingan)),
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
          submissionTime: resMahasiswa.data.data.submission_time,
        },
        topik: {
          judul: resMahasiswa.data.data.judul,
          deskripsi: resMahasiswa.data.data.deskripsi,
        },
      };
    } else {
      const res = await getLogBimbinganS2(id ?? "");

      data = {
        bimbingan: res.data.bimbingan.map((item) => ({
          id: item.id,
          tanggal: formatDateWithoutClock(new Date(item.waktuBimbingan)),
          laporan_kemajuan: item.laporanKemajuan,
          todo: item.todo,
          rencana: item.bimbinganBerikutnya
            ? formatDateWithoutClock(new Date(item.bimbinganBerikutnya))
            : "",
          berkas: item.berkas.map((berkasItem) => ({
            nama: berkasItem.nama,
            link: berkasItem.url,
          })),
          status: item.disahkan,
        })),
        mahasiswa: {
          name: res.data.mahasiswa.nama,
          email: res.data.mahasiswa.email,
          major: res.data.mahasiswa.jalurPilihan,
          submissionTime: "",
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
      enableSorting: false,
    },
    {
      header: "Laporan Kemajuan",
      accessorKey: "laporan_kemajuan",
      minSize: 1000,
      enableSorting: false,
    },
    {
      header: "Todo",
      accessorKey: "todo",
      minSize: 1000,
      enableSorting: false,
    },
    {
      header: "Rencana",
      accessorKey: "rencana",
      minSize: 1000,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      cell: ({ row }) => (
        <ul className="flex flex-col items-start gap-2">
          {row.original.berkas.map((b, index) => (
            <BerkasBadge key={index} title={b.nama} link={b.link} />
          ))}
        </ul>
      ),
      minSize: 500,
      enableSorting: false,
    },
    {
      header: "Status Bimbingan",
      accessorKey: "status",
      cell: ({ row }) => (
        <StatusCircle
          mhsId={id ?? ""}
          strata={strata as "S1" | "S2"}
          row={row}
        />
      ),
      minSize: 600,
      enableSorting: false,
    },
  ];

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
  };
}
