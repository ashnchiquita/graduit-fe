import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import useLogBimbinganMahasiswa from "./hooks/useLogBimbinganMahasiswa";
// import MahasiswaCardLogBimbingan from "./components/MahasiswaCardLogBimbingan";
import MahasiswaCard from "../components/MahasiswaCard";
import { User } from "@/lib/entity";

const dummyUsers: User[] = [
  {
    id: "1",
    name: "Ariel Jovananda",
    email: "135210856@mahasiswa.itb.ac.id",
    major: "Teknik Informatika",
    profpic: "",
  },
  {
    id: "2",
    name: "Ariel Jovananda",
    email: "135210856@mahasiswa.itb.ac.id",
    major: "Teknik Informatika",
    profpic: "",
  },
];

export default function LogBimbinganMahasiswa() {
  const [searchValue, setSearchValue] = useState("");
  const { table } = useLogBimbinganMahasiswa();

  return (
    <main className="flex min-h-screen flex-col gap-4 p-5">
      {/* <p className="mb-10 text-5xl font-black">Bimbingan Logs</p> */}
      <MahasiswaCard user={dummyUsers[0]} backArrow={true} logs={false} />
      <DataTable
        table={table}
        headline="Log Bimbingan"
        description="Berikut merupakan log bimbingan"
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchPlaceholder="Search something"
        onClickFilter={() => {
          console.log("filtered");
        }}
      />
    </main>
  );
}
