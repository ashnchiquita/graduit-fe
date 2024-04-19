import { DataTable } from "@/components/DataTable";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";
import MahasiswaCard from "../components/MahasiswaCard";

export default function LogBimbinganMahasiswa() {
  const { table, mahasiswaData, searchValue, handleSearchValueChange, topik } =
    useLogBimbinganMahasiswa();

  return (
    <main className="flex min-h-screen flex-col gap-4 p-5">
      <MahasiswaCard
        user={{
          ...mahasiswaData,
          id: "",
        }}
        topik={topik.judul}
        deskripsiTopik={topik.deskripsi}
        backArrow={true}
        logs={false}
      />
      <DataTable
        table={table}
        headline="Log Bimbingan"
        description="Berikut merupakan log bimbingan"
        setSearchValue={handleSearchValueChange}
        searchValue={searchValue}
        searchPlaceholder="Search something"
      />
    </main>
  );
}
