import BarChartCard from "./components/BarChartCard";
import DoughnutChartCard from "./components/DoughnutChartCard";
import { DataTable } from "@/components/DataTable";
import MobileBimbinganList from "./components/MobileBimbinganList";
import useDashboardDosbim from "./hooks/useDashboardDosbim";
import { useState } from "react";
import { BarChartDosbing } from "./types";

const DashboardDosbim = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);

    // TODO: Refetch data from database
  };

  const barChartData: BarChartDosbing[] = [
    { level: "S1", lancar: 10, bimbingan: 5, terkendala: 3 },
    { level: "S2", lancar: 8, bimbingan: 2, terkendala: 4 },
  ];

  const { table, mahasiswaData, doughnutChartData } = useDashboardDosbim();

  return (
    <div className="flex size-full max-h-screen flex-col gap-2 px-4 pb-4">
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
      <div className="hidden md:block">
        <DataTable
          table={table}
          headline="Daftar Mahasiswa"
          description="Daftar mahasiswa bimbingan beserta statusnya."
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
        />
      </div>
      <div className="block md:hidden">
        <MobileBimbinganList
          data={mahasiswaData}
          searchPlaceholder="Cari mahasiswa..."
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </div>
  );
};

export default DashboardDosbim;
