import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import useSWR from "swr";
import {
  getDashboardDosbimS1,
  getDashboardDosbimS2,
  getDosbimStatisticsS1,
  getDosbimStatisticsS2,
  getDosbimStatusBimbinganS1,
} from "../clients";
import StatusCell from "../components/StatusCell";
import {
  BarChartDosbing,
  DashboardDosbimHookRet,
  DoughnutChartDosbing,
  MahasiswaBimbingan,
} from "../types";

export default function useDashboardDosbim(): DashboardDosbimHookRet {
  const { data: sessionData } = useSession();

  const { data: s1MahasiswaData = [] } = useSWR(
    "/api/dosbing/dashboard",
    async () => {
      const res = await getDashboardDosbimS1();
      console.log("res", res);
      const data = res.data.data.map((item) => ({
        id: item.id,
        nim: item.nim,
        nama: item.nama,
        topik: item.judul_topik,
        status: item.status,
        strata: "S1" as "S1",
      }));

      return data;
    },
  );

  const { data: s2MahasiswaData = [] } = useSWR(
    "/dashboard/dosbim/s2",
    async () => {
      const res = await getDashboardDosbimS2();

      const data = res.data.map((item) => ({
        id: item.mahasiswa.id,
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
    if (sessionData && sessionData.roles.includes(RoleEnum.S1_PEMBIMBING)) {
      setMahasiswaData((prev) => {
        const prevData = prev.filter((mahasiswa) => mahasiswa.strata === "S2");
        return [...prevData, ...s1MahasiswaData];
      });
    }
  }, [s1MahasiswaData, sessionData]);

  useEffect(() => {
    if (sessionData && sessionData.roles.includes(RoleEnum.S2_PEMBIMBING)) {
      setMahasiswaData((prev) => {
        const prevData = prev.filter((mahasiswa) => mahasiswa.strata === "S1");
        return [...prevData, ...s2MahasiswaData];
      });
    }
  }, [s2MahasiswaData, sessionData]);

  const [mahasiswaData, setMahasiswaData] = useState<MahasiswaBimbingan[]>([]);

  const { data: s1StatisticData = [] } = useSWR(
    "/api/dosbing/dashboard/statistic",
    async () => {
      const res = await getDosbimStatisticsS1();
      const data = [
        {
          type: "IF",
          amount: res.data.data.mahasiswa_if,
        },
        {
          type: "STI",
          amount: res.data.data.mahasiswa_sti,
        },
      ];

      return data;
    },
  );

  const { data: s2StatisticData = [] } = useSWR(
    "/dashboard/dosbim/statistics",
    async () => {
      const res = await getDosbimStatisticsS2();

      const data = res.data.map((item) => ({
        type: item.jalurPilihan,
        amount: item.count,
      }));

      return data;
    },
  );

  const { data: s1BimbinganData } = useSWR(
    "/api/dosbing/dashboard/status-bimbingan",
    async () => {
      const res = await getDosbimStatusBimbinganS1();

      const data = {
        bimbingan: res.data.data.butuh_bimbingan,
        lancar: res.data.data.lancar,
        terkendala: res.data.data.terkendala,
      };

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

  const barChartData: BarChartDosbing[] = [
    {
      level: "S1",
      lancar: s1BimbinganData?.lancar ?? 0,
      bimbingan: s1BimbinganData?.bimbingan ?? 0,
      terkendala: s1BimbinganData?.terkendala ?? 0,
    },
    { level: "S2", lancar: 8, bimbingan: 2, terkendala: 4 },
  ];

  const columns: ColumnDef<MahasiswaBimbingan>[] = [
    {
      header: "NIM",
      accessorKey: "nim",
      enableSorting: false,
      minSize: 150,
    },
    {
      header: "Nama",
      accessorKey: "nama",
      enableSorting: false,
      minSize: 200,
    },
    {
      header: "Topik",
      accessorKey: "topik",
      enableSorting: false,
      minSize: 600,
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => <StatusCell row={row} />,
      minSize: 100,
    },
    {
      id: "link",
      cell: ({ row }) => (
        <Link
          to={`/dosen/bimbingan/${row.original.strata.toLowerCase()}/${row.original.id}`}
        >
          <div className="hover:text-blue-500">
            <HiOutlineExternalLink className="size-4" />
            <div className="text-sm">Buka Riwayat Bimbingan Mahasiswa</div>
          </div>
        </Link>
      ),
      minSize: 40,
      meta: {
        align: "right",
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: mahasiswaData,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    mahasiswaData: s2MahasiswaData,
    doughnutChartData,
    barChartData,
  };
}
