import { DataTable } from "@/components/DataTable";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";
import ExpandableMahasiswaCard from "@/components/ExpandableMahasiswaCard";

export default function LogBimbinganMahasiswa() {
  const { table, mahasiswaData, topik } = useLogBimbinganMahasiswa();
  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 pb-4">
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
