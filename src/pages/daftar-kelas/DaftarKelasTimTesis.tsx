import { useState } from "react";
import { DaftarKelasTimTesisData } from "./types";
import { Plus, Search } from "lucide-react";
import CardKelas from "./components/CardKelas";
import { Button } from "@/components/ui/button";

export default function DaftarKelasTimTesis(): JSX.Element {
  const [daftarKelas, setDaftarKelas] = useState<DaftarKelasTimTesisData>([
    {
      id: "1",
      nomor: "K01",
      mata_kuliah: "IF6969 Tesis",
      jumlah_mahasiswa: 2,
    },
    {
      id: "2",
      nomor: "K02",
      mata_kuliah: "IF6969 Tugas Akhir",
      jumlah_mahasiswa: 1,
    },
    {
      id: "3",
      nomor: "K03",
      mata_kuliah: "IF6969 Skripsi",
      jumlah_mahasiswa: 3,
    },
    {
      id: "4",
      nomor: "K04",
      mata_kuliah: "IF6969 Tesis",
      jumlah_mahasiswa: 2,
    },
    {
      id: "5",
      nomor: "K05",
      mata_kuliah: "IF6969 Tugas Akhir",
      jumlah_mahasiswa: 1,
    },
    {
      id: "6",
      nomor: "K06",
      mata_kuliah: "IF6969 Skripsi",
      jumlah_mahasiswa: 3,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="flex w-full flex-col gap-4 px-4">
      <div className="flex w-full justify-end gap-2">
        {/* Search Bar */}
        <div className="flex grow items-center gap-2 rounded-md border border-input bg-white px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            className="w-full grow bg-transparent outline-none"
            placeholder="Masukkan nama atau kode kelas..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-auto bg-blue-500 px-2 text-gray-100 hover:bg-blue-600"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={12} className="mr-2" />
            <p className="text-xs">Tambah Kelas</p>
          </Button>
        </div>
      </div>

      {/* Daftar Kelas */}
      <div className="grid w-fit grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {daftarKelas.map((kelas) => (
          <div onClick={() => {}} className="mx-auto max-w-xs cursor-pointer">
            <CardKelas key={kelas.id} dataKelas={kelas} />
          </div>
        ))}
      </div>
    </div>
  );
}
