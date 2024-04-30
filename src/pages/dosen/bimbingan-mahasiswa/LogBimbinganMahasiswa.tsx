import { DataTable } from "@/components/DataTable";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";
import ExpandableMahasiswaCard from "@/components/ExpandableMahasiswaCard";

export default function LogBimbinganMahasiswa() {
  const { table, mahasiswaData, searchValue, handleSearchValueChange, topik } =
    useLogBimbinganMahasiswa();

  return (
    //TODO mobile screen
    <main className="flex min-h-screen flex-col gap-4 p-5">
      <ExpandableMahasiswaCard
        user={{
          id: "",
          name: mahasiswaData.name,
          email: mahasiswaData.email,
          major: mahasiswaData.major,
          submissionTime: new Date(),
        }}
        backArrow
        topik={topik.judul}
        deskripsi={topik.deskripsi}
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
