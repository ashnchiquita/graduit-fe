import useSWR from "swr";
import { getDashboardDosbim, getDosbimStatistics } from "../clients";
import StatusCell from "../components/StatusCell";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DashboardDosbimHookRet,
  DoughnutChartDosbing,
  MahasiswaBimbingan,
} from "../types";
import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function useDashboardDosbim(): DashboardDosbimHookRet {
  // TODO: Update this to fetch from S1 service
  const { data: s1MahasiswaData = [] } = useSWR(
    "/dashboard/dosbim",
    async () => {
      const res = await getDashboardDosbim();

      const data = res.data.map((item) => ({
        nim: item.mahasiswa.nim,
        nama: item.mahasiswa.nama,
        topik: item.topik.judul,
        status: item.status,
        strata: "S1" as "S1",
      }));

      return data;
    },
  );

  const { data: s2MahasiswaData = [] } = useSWR(
    "/dashboard/dosbim",
    async () => {
      const res = await getDashboardDosbim();

      const data = res.data.map((item) => ({
        nim: item.mahasiswa.nim,
        nama: item.mahasiswa.nama,
        topik: item.topik.judul,
        status: item.status,
        strata: "S2" as "S2",
      }));

      return data;
    },
  );

  useEffect(() => {
    setMahasiswaData((prev) => {
      const newData = prev.filter((mahasiswa) => mahasiswa.strata === "S2");
      return [...newData, ...s1MahasiswaData];
    });
  }, [s1MahasiswaData]);

  useEffect(() => {
    setMahasiswaData((prev) => {
      const newData = prev.filter((mahasiswa) => mahasiswa.strata === "S1");
      return [...newData, ...s2MahasiswaData];
    });
  }, [s2MahasiswaData]);

  const [mahasiswaData, setMahasiswaData] = useState<MahasiswaBimbingan[]>([]);

  // TODO: Update this to fetch from S1 service
  const { data: s1StatisticData = [] } = useSWR(
    "/dashboard/dosbim/statistics",
    async () => {
      const res = await getDosbimStatistics();

      const data = res.data.map((item) => ({
        type: item.jalurPilihan,
        amount: item.count,
      }));

      return data;
    },
  );

  const { data: s2StatisticData = [] } = useSWR(
    "/dashboard/dosbim/statistics",
    async () => {
      const res = await getDosbimStatistics();

      const data = res.data.map((item) => ({
        type: item.jalurPilihan,
        amount: item.count,
      }));

      return data;
    },
  );

  const doughnutChartData: DoughnutChartDosbing[] = [
    {
      level: "S1",
      data: s1StatisticData,
    },
    {
      level: "S2",
      data: s2StatisticData,
    },
  ];

  const columns: ColumnDef<MahasiswaBimbingan>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
    },
    {
      header: "Nama",
      accessorKey: "nama",
    },
    {
      header: "Topik",
      accessorKey: "topik",
      enableSorting: false,
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => <StatusCell row={row} />,
    },
    {
      id: "link",
      cell: ({ row }) => (
        <Link to={`/dosen/bimbingan/${row.original.nim}`}>
          <HiOutlineExternalLink className="size-4 hover:text-blue-500" />
        </Link>
      ),
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: mahasiswaData,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    mahasiswaData: s2MahasiswaData,
    doughnutChartData,
  };
}
