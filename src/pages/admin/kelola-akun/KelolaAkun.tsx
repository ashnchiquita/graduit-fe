/* eslint-disable prettier/prettier */
import { DataTable } from "@/components/DataTable";
import useKelolaAkun from "./hooks/useKelolaAkun";
import FilterPopup from "./components/FilterPopup";

export default function KelolaAkun(): JSX.Element {
  const { table, searchValue, handleSearchValueChange, fetchData,openFilterDialog, setOpenFilterDialog, namaValue, setNamaValue, emailValue, setEmailValue, roleValue, setRoleValue, handleRoleValueChange } =
    useKelolaAkun();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Pengaturan Akun Aplikasi Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau email"
        customElementsRight={
          <FilterPopup openFilterDialog={openFilterDialog} setOpenFilterDialog={setOpenFilterDialog} filterNama={namaValue} handleFilterNamaChange={setNamaValue} filterEmail={emailValue} handleFilterEmailChange={setEmailValue} filterRole={roleValue} setFilterRole={setRoleValue} handleRoleValueChange={handleRoleValueChange} fetchData={fetchData} />
        }
      />
    </main>
  );
}
