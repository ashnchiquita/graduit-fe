import { DataTable } from "@/components/DataTable";
import { StatusPengerjaanOptions } from "./constants";
import useDaftarTugas from "./hooks/useDaftarTugas";
import KelasHeader from "./components/KelasHeader";
import useKelasHeader from "./hooks/useKelasHeader";
// import { useParams } from "react-router-dom";

export default function Kelas() {
  // const { idKelas } = useParams<{ idKelas: string }>();

  const {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
  } = useDaftarTugas();

  const { dataKelasHeader, dataKelasDetail } = useKelasHeader();

  return (
    <main className="flex flex-col gap-6 px-6">
      <section>
        <KelasHeader {...dataKelasHeader} detail={dataKelasDetail} />
      </section>

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
