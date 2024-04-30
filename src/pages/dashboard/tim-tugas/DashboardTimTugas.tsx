import { DataTable } from "@/components/DataTable";
import { DashboardTimTugasProps } from "./types";
import useDashboardTimTugas from "./hooks/useDashboardTimTugas";

export default function DashboardTimTugas({
  strata,
}: DashboardTimTugasProps): JSX.Element {
  const { table, searchValue, handleSearchValueChange } = useDashboardTimTugas({
    strata,
  });

  return (
    <main className="w-full overflow-x-hidden px-5 md:px-7">
      {/* <section className="md:w-auto"> */}
      <DataTable
        table={table}
        headline="Daftar Mahasiswa"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau NIM mahasiswa"
      />
      {/* </section> */}
    </main>
  );
}
