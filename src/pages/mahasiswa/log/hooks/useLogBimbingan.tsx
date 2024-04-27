import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "../components/BadgeTable";
import { ButtonDownload } from "../components/ButtonTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-day-picker";
import useSWR from "swr";
import { getLogBimbinganStatusForS1, getMahasiswaLogin } from "../client";
import type {
  Berkas,
  GetLogBimbinganStatusResData,
  LogBimbinganData,
  LogBimbinganStatusData,
} from "../types";
import { MahasiswaLogs } from "@/lib/entity";
import { SessionData } from "@/types/session-data";
import { getSession } from "@/layouts/clients";

const useLogBimbingan = () => {
  const { id } = useParams();

  const defaultData: LogBimbinganStatusData = {
    status: false,
    bimbingan_logs: [],
  };

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
  const { data = defaultData } = useSWR(
    "/admin/bimbingan-logs-status",
    async () => {
      let data: LogBimbinganStatusData;
      const resMahasiswa = await getSession();
      const resLog = await getLogBimbinganStatusForS1(
        resMahasiswa.data.id ?? "",
      );
      console.log(resLog.data.data.bimbingan_logs);
      data = {
        status: resLog.data.data.status,
        bimbingan_logs: resLog.data.data.bimbingan_logs.map(
          (item: LogBimbinganData) => ({
            id: item.id,
            date: new Date(item.date)
            .toLocaleDateString("en-ID", { year: 'numeric', month: '2-digit', day: '2-digit' })
            .split("/")
            .reverse()
            .join("/"),
            laporan_kemajuan: item.laporan_kemajuan,
            todo: item.todo,
            next_bimbingan: item.next_bimbingan,
            status: item.status,
            berkas: item.berkas.map((berkasItem: Berkas) => ({
              nama: berkasItem.nama,
              link: berkasItem.link,
            })),
          }),
        ),
      };
      return data;
    },
  );
  const [range, setRange] = useState<DateRange | undefined>();

  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("/add-log-bimbingan/s1");
  };

  const onClickFilter = () => {};

  const columns: ColumnDef<LogBimbinganData>[] = [
    {
      header: "Tanggal",
      accessorKey: "date",
      minSize: 1000,
    },
    {
      header: "Laporan Kemajuan",
      accessorKey: "laporan_kemajuan",
      minSize: 1000,
      enableSorting: false,
    },
    {
      header: "To-Do",
      accessorKey: "todo",
      minSize: 1000,
      enableSorting: false,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      minSize: 1000,
      cell: ({ row }) => <ButtonDownload row={row} />,
      enableSorting: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      minSize: 1000,
      cell: ({ row }) => (
        <Badge row={row} variant={row.original.status ? "default" : "danger"} />
      ),
      enableSorting: false,
    },
    {
      header: "Rencana",
      accessorKey: "next_bimbingan",
      minSize: 1000,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: data.bimbingan_logs,
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
    onClickCreate,
    onClickFilter,
    range,
    setRange,
    data,
  };
};

export default useLogBimbingan;
