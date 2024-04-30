import { DataTable } from "@/components/DataTable";
import { DashboardTimTugasProps } from "./types";
import useDashboardTimTugas from "./hooks/useDashboardTimTugas";

export default function DashboardTimTugas({
  strata,
}: DashboardTimTugasProps): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    strataFilter,
    setStrataFilter,
  } = useDashboardTimTugas({
    strata,
  });

  return (
    <main className="w-full overflow-x-hidden px-5 md:px-7">
      <DataTable
        table={table}
        headline="Daftar Mahasiswa"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau NIM mahasiswa"
        selectFilterValue={strata === "ALL" ? strataFilter : undefined}
        selectFilterPlaceholder="Semua"
        setSelectFilterValue={(val: string) =>
          setStrataFilter(val as "S1" | "S2")
        }
        selectFilterOptions={
          strata === "ALL"
            ? [
                {
                  value: "S1",
                  label: "Mahasiswa S1",
                },
                {
                  value: "S2",
                  label: "Mahasiswa S2",
                },
              ]
            : []
        }
      />
    </main>
  );
}
