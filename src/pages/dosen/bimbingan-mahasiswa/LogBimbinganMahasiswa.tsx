import { DataTable } from "@/components/DataTable";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";
import ExpandableMahasiswaCard from "@/components/ExpandableMahasiswaCard";

export default function LogBimbinganMahasiswa() {
  const { table, mahasiswaData, topik } = useLogBimbinganMahasiswa();
  console.log(mahasiswaData);
  return (
    //TODO mobile screen
    <main className="flex min-h-screen flex-col gap-4 p-5">
      <ExpandableMahasiswaCard
        user={{
          id: "",
          name: mahasiswaData.name,
          email: mahasiswaData.email,
          major: mahasiswaData.major,
          submissionTime:
            mahasiswaData.submissionTime !== ""
              ? new Date(mahasiswaData.submissionTime)
              : undefined,
        }}
        backArrow
        topik={topik.judul}
        deskripsi={topik.deskripsi}
      />
      <DataTable
        table={table}
        headline="Log Bimbingan"
        description="Berikut merupakan log bimbingan"
        searchPlaceholder="Search something"
      />
    </main>
  );
}
