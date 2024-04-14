/* eslint-disable prettier/prettier */
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useKelolaAkun from "./hooks/useKelolaAkun";

export default function KelolaAkun(): JSX.Element {
  const { table, searchValue, handleSearchValueChange, onClickCreate } =
    useKelolaAkun();

  return (
    <main className="flex w-full flex-col gap-5 px-4">
      <DataTable
        table={table}
        headline="Pengaturan Akun Aplikasi Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        customElementsRight={
          <Button
            onClick={() => {
              onClickCreate();
            }}
            className="flex h-fit gap-2 border border-blue-500 bg-blue-500 px-2 py-1 hover:border-blue-600 hover:bg-blue-600"
          >
            <Plus size={14} />
            <div>Create</div>
          </Button>
        }
      />
    </main>
  );
}
