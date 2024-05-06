import { DataTable } from "@/components/DataTable";
import { StatusPengerjaanOptions } from "./constants";
import useDaftarTugas from "./hooks/useDaftarTugas";

export default function Kelas() {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
  } = useDaftarTugas();

  return (
    <main className="flex flex-col gap-6 px-6">
      <section className="hidden pb-8 md:block">
        <DataTable
          table={table}
          headline="Daftar Tugas"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari judul tugas"
          selectFilterValue={statusFilter}
          selectFilterPlaceholder="Semua"
          setSelectFilterValue={handleStatusFilterChange}
          selectFilterOptions={StatusPengerjaanOptions}
        />
      </section>
    </main>
  );
}
