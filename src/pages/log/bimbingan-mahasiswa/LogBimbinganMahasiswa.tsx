"use client";
import { DataTable, columns } from "@/components/DataTable";
import type { SystemLogs } from "@/lib/entity";

export default function LogBimbinganMahasiswa() {
  const data: SystemLogs[] = [
    {
      id: "1",
      idPengguna: "2",
      action: "Ada deh",
      createdAt: "02/03/2024 19:58",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col p-5">
      <DataTable columns={columns} data={data}></DataTable>
    </main>
  );
}
