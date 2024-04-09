import { DataTable } from "@/components/DataTable";
import useKelolaAkun from "./hooks/useKelolaAkun";

export default function KelolaAkun(): JSX.Element {
  const { table, searchValue, handleSearchValueChange, onClickCreate } =
    useKelolaAkun();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Kelola Akun Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        onClickCreate={onClickCreate}
      />
    </main>
  );
}
