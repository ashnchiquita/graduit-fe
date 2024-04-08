import { DataTable } from "@/components/DataTable";
import useRekapPendaftaranDosbim from "./hooks/useRekapPendaftaranDosbim";

export default function RekapPendaftaranDosbim(): JSX.Element {
  const { table, searchValue, handleSearchValueChange } =
    useRekapPendaftaranDosbim();

  return (
    <main className="flex flex-col gap-3.5 px-7">
      <div className="h-[236px] w-full rounded-lg bg-white px-6 py-3 text-slate-900">
        <h2 className="text-lg font-medium">Statistik</h2>
      </div>

      <DataTable
        table={table}
        headline="Pengajuan Mahasiswa"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau NIM mahasiswa"
      />
    </main>
  );
}
