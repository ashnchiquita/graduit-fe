import { DataTable } from "@/components/DataTable";
import useDaftarTopikTimTugas from "./hooks/useDaftarTopikTimTugas";

export default function DaftarTopikTimTugas() {
  const { table, searchValue, handleChangeSearchValue } =
    useDaftarTopikTimTugas();
  return (
    <div className="px-4">
      <DataTable
        table={table}
        headline="Daftar Topik"
        description="Topik yang diajukan oleh pembimbing"
        searchValue={searchValue}
        setSearchValue={handleChangeSearchValue}
        searchPlaceholder="Cari topik atau dosen pengaju"
      />
    </div>
  );
}
