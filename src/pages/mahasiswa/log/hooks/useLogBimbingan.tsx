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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import useSWR from "swr";
import { getBimbinganS2, getLogBimbinganStatusForS1 } from "../client";
import type {
  Berkas,
  LogBimbinganData,
  LogBimbinganStatusData,
} from "../types";

import { getSession } from "@/layouts/clients";
import { formatDateNotHour } from "../utils";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import BerkasBadge from "@/components/BerkasBadge";

const useLogBimbingan = () => {
  const { data: sessionData } = useSession();

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

      if (sessionData?.roles.includes(RoleEnum.S1_MAHASISWA)) {
        const resMahasiswa = await getSession();
        const resLog = await getLogBimbinganStatusForS1(
          resMahasiswa.data.id ?? "",
        );
        data = {
          status: resLog.data.data.status,
          bimbingan_logs: resLog.data.data.bimbingan_logs.map(
            (item: LogBimbinganData) => ({
              id: item.id,
              date: formatDateNotHour(new Date(item.date)),
              laporan_kemajuan: item.laporan_kemajuan,
              todo: item.todo,
              next_bimbingan: formatDateNotHour(new Date(item.next_bimbingan)),
              status: item.status,
              berkas: item.berkas.map((berkasItem: Berkas) => ({
                nama: berkasItem.nama,
                link: berkasItem.link,
              })),
            }),
          ),
        };
        return data;
      } else {
        const { data } = await getBimbinganS2();
        return {
          status: true,
          bimbingan_logs: data.bimbingan.map((b) => ({
            id: b.id,
            date: formatDateNotHour(new Date(b.waktuBimbingan)),
            laporan_kemajuan: b.laporanKemajuan,
            todo: b.todo,
            next_bimbingan: formatDateNotHour(
              b.bimbinganBerikutnya
                ? new Date(b.bimbinganBerikutnya)
                : new Date(),
            ),
            status: b.disahkan,
            berkas: b.berkas.map((berkasItem) => ({
              nama: berkasItem.nama,
              link: berkasItem.url,
            })),
          })),
        };
      }
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
      minSize: 120,
      maxSize: 120,
    },
    {
      header: "Laporan Kemajuan",
      accessorKey: "laporan_kemajuan",
      minSize: 300,
      enableSorting: false,
    },
    {
      header: "To-Do",
      accessorKey: "todo",
      minSize: 300,
      enableSorting: false,
    },
    {
      header: "Berkas",
      accessorKey: "berkas",
      minSize: 170,
      cell: ({ row }) => (
        <ul className="flex flex-col items-start gap-2">
          {row.original.berkas.map((b, index) => (
            <BerkasBadge key={index} title={b.nama} link={b.link} />
          ))}
        </ul>
      ),
      enableSorting: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      minSize: 50,
      maxSize: 50,
      cell: ({ row }) => (
        <Badge row={row} variant={row.original.status ? "default" : "danger"} />
      ),
      enableSorting: false,
      meta: {
        alignHeader: "center",
      },
    },
    {
      header: "Rencana",
      accessorKey: "next_bimbingan",
      minSize: 120,
      maxSize: 120,
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
