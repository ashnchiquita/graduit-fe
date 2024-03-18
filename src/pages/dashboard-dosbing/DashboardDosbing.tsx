import BarChartCard from "./components/BarChartCard";
import BarChartDosbing from "@/types/bar-chart-dosbing";
import DoughnutChartCard from "./components/DoughnutChartCard";
import DoughnutChartDosbing from "@/types/doughnut-chart-dosbing";
import { DataTable } from "@/components/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MahasiswaBimbingan } from "./types";
import { useState } from "react";
import StatusCell from "./components/StatusCell";

const DashboardDosbing = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);

    // TODO: Refetch data from database
  };

  // TODO: Use data from database
  const data = [
    {
      nim: "13518001",
      nama: "John Doe",
      topik: "Pengembangan Aplikasi",
      status: "lancar",
    },
    {
      nim: "13518002",
      nama: "Jane Doe",
      topik: "Pengembangan Aplikasi",
      status: "perlu bimbingan",
    },
    {
      nim: "13518003",
      nama: "John Smith",
      topik: "Pengembangan Aplikasi",
      status: "terkendala",
    },
  ];

  const barChartData: BarChartDosbing[] = [
    { level: "S1", lancar: 10, bimbingan: 5, terkendala: 3 },
    { level: "S2", lancar: 8, bimbingan: 2, terkendala: 4 },
  ];

  const doughnutChartData: DoughnutChartDosbing[] = [
    {
      level: "S1",
      data: [
        {
          type: "IF",
          amount: 10,
        },
        {
          type: "STI",
          amount: 5,
        },
      ],
    },
    {
      level: "S2",
      data: [
        {
          type: "Ilmu Komputer (CS)",
          amount: 8,
        },
        {
          type: "Sistem Informasi (SI)",
          amount: 2,
        },
        {
          type: "Sistem Inteligensi (IntS)",
          amount: 4,
        },
        {
          type: "Komputasi Cloud (CC)",
          amount: 3,
        },
      ],
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
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex size-full flex-col gap-2 px-4 pb-4">
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <BarChartCard
          title="Progress Mahasiswa"
          desc="Statistik mahasiswa bimbingan beserta statusnya."
          data={barChartData}
        />
        <DoughnutChartCard
          title="Jalur Pilihan Mahasiswa"
          desc="Proporsi jalur pilihan mahasiswa bimbingan. Hover untuk melihat detail."
          data={doughnutChartData}
        />
      </div>
      <DataTable
        table={table}
        headline="Daftar Mahasiswa"
        description="Daftar mahasiswa bimbingan beserta statusnya."
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
      />
    </div>
  );
};

export default DashboardDosbing;
