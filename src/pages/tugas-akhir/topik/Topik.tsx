import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import useTopik from "./hooks/useTopik";

export default function TopicAllocation() {
  const { role } = useParams();
  const { table, searchValue, handleSearchValueChange, onClickCreate } =
    useTopik();

  return (
    <>
      <main className="flex min-h-full min-w-full flex-col p-5">
        <DataTable
          table={table}
          headline="Daftar Topik"
          description="Topik yang diajukan oleh dosen pembimbing"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          customElementsRight={
            <Button
              onClick={() => (Number(role) > 0 ? onClickCreate : undefined)}
              className="flex h-fit gap-2 border border-blue-500 bg-blue-500 px-2 py-1 hover:border-blue-600 hover:bg-blue-600"
            >
              <Plus size={14} />
              <div>Create</div>
            </Button>
          }
        />
      </main>
    </>
  );
}
