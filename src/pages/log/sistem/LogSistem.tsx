import { DataTable, columns } from "@/components/DataTable";
import type { SystemLogs } from "@/lib/entity";

const dummySystemLogs: SystemLogs[] = [
  {
    id: "1",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "1",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "1",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
  {
    id: "1",
    idPengguna: "2",
    action: "Menerima Mahasiswa X",
    createdAt: "02/03/2024 17:06",
  },
];

export default function LogSistem() {
  return (
    <main className="flex min-h-screen flex-col p-5">
      <p className="mb-10 text-5xl font-black">System Logs</p>
      <DataTable columns={columns} data={dummySystemLogs}></DataTable>
    </main>
  );
}
