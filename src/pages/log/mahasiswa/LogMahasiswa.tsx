"use client";
import { DataTable } from "@/components/DataTable";
import TagStatus from "./components/TagStatus";
import useLogBimbingan from "./hooks/useLogBimbingan";

export default function LogMahasiswa(): JSX.Element {
  const { table, onClickCreate, onClickFilter } = useLogBimbingan();

  return (
    <div className="flex flex-col gap-4 px-4 pb-20">
      <TagStatus status="SAH" />
      <DataTable
        headline="Log Bimbingan"
        table={table}
        onClickCreate={onClickCreate}
        onClickFilter={onClickFilter}
      />
    </div>
  );
}
