import MahasiswaCard from "./components/MahasiswaCard";
import type { User } from "@/lib/entity";

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

export default function LogBimbingan() {
  return (
    <main className="flex min-h-screen flex-col p-5">
      <p className="mb-10 text-5xl font-black">Log Bimbingan Mahasiswa</p>
      <div className="flex w-full flex-col space-y-4">
        <div className="mx-auto w-full">
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
            <div className="grid h-full w-12 place-items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer size-full pr-2 text-sm text-gray-700 outline-none"
              type="text"
              id="search"
              placeholder="Masukkan nama atau NIM mahasiswa"
            />
          </div>
        </div>

        {dummyUsers.map((item, idx) => {
          return <MahasiswaCard key={idx} user={item} logs={true} />;
        })}
      </div>
    </main>
  );
}
