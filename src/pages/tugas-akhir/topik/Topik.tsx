import { useParams } from "react-router-dom";
import useTopik from "./hooks/useTopik";
import { DataTable } from "@/components/DataTable";

export default function TopicAllocation() {
  const { role } = useParams()
  const { table, searchValue, handleSearchValueChange, onClickCreate } = useTopik()

  return (
    <>
      <main className="flex min-h-full min-w-full flex-col p-5">
        <DataTable
          table={table}
          headline="Daftar Topik"
          description="Topik yang diajukan oleh dosen pembimbing"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          onClickCreate={Number(role) > 0 ? onClickCreate : undefined}
        />
      </main>
    </>
  );
}
