/* eslint-disable prettier/prettier */
import { DataTable } from "@/components/DataTable";
import useKelolaAkun from "./hooks/useKelolaAkun";
import FilterPopup from "../components/FilterPopup";
import { Button } from "@/components/ui/button";
import { VscListFilter } from "react-icons/vsc";

export default function KelolaAkun(): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    openFilterDialog,
    setOpenFilterDialog,
    namaValue,
    setNamaValue,
    emailValue,
    setEmailValue,
    roleValue,
    setRoleValue,
    handleRoleValueChange,
    roleAccess,
  } = useKelolaAkun();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Pengaturan Akun Aplikasi Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau email"
        customElementsRight={
          <Button
            onClick={() => setOpenFilterDialog(true)}
            variant={"ghost"}
            className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
          >
            <VscListFilter size={14} />
            Filter
          </Button>
        }
      />
      <FilterPopup
        {...{
          fetchData,
          openFilterDialog,
          setOpenFilterDialog,
          namaValue,
          setNamaValue,
          emailValue,
          setEmailValue,
          roleValue,
          setRoleValue,
          handleRoleValueChange,
          roleAccess,
        }}
      />
    </main>
  );
}
