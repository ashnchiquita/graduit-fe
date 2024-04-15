import { DataTable } from "@/components/DataTable";
import useRuangan from "./hooks/useRuangan";
import Dropdown from "./components/Dropdown";
import { MahasiswaDropdownOptions, SidangDropdownOptions } from "./types";

const Ruangan = () => {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    filterMahasiswa,
    handleFilterMahasiswaChange,
    filterTipeSidang,
    handleFilterTipeSidangChange,
  } = useRuangan();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Daftar Pengajuan Sidang"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        customElementsRight={
          <div className="flex flex-row justify-center gap-2">
            <Dropdown
              selectedOption={filterMahasiswa}
              handleChange={handleFilterMahasiswaChange}
              options={MahasiswaDropdownOptions}
            />
            <Dropdown
              selectedOption={filterTipeSidang}
              handleChange={handleFilterTipeSidangChange}
              options={SidangDropdownOptions}
            />
          </div>
        }
      />
    </main>
  );
};

export default Ruangan;
