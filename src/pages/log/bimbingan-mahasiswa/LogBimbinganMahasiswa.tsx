import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";

export default function LogBimbinganMahasiswa() {
  const [searchValue, setSearchValue] = useState("");
  const { table } = useLogBimbinganMahasiswa()

  return (
    <main className="flex min-h-screen flex-col p-5">
      {/* <p className="mb-10 text-5xl font-black">Bimbingan Logs</p> */}
      <DataTable
        table={table}
        headline="Log Bimbingan"
        description="Berikut merupakan log bimbingan"
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchPlaceholder="Search something"
        onClickFilter={() => {
          console.log("filtered");
        }}
      />
    </main>
  );
}
