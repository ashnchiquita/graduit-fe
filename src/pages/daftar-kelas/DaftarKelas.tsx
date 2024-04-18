import { Plus, Search } from "lucide-react";
import CardKelas from "./components/CardKelas";
import { Button } from "@/components/ui/button";
import TambahKelasDialog from "./components/TambahKelasDialog";
import { RoleEnum } from "@/types/session-data";
import useDaftarKelas from "./hooks/useDaftarKelas";
import DataContext from "./context/DataContext";

export default function DaftarKelas(): JSX.Element {
  const {
    data,
    searchVal,
    viewVal,
    handleSearchValChange,
    dialogOpen,
    setDialogOpen,
    refreshData,
  } = useDaftarKelas();

  return (
    <DataContext.Provider value={{ refreshData: refreshData }}>
      <div className="flex w-full flex-col gap-4 px-4">
        <TambahKelasDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
        <div className="flex w-full justify-end gap-2">
          {/* Search Bar */}
          <div className="flex grow items-center gap-2 rounded-md border border-input bg-white px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <Search size={14} className="text-muted-foreground" />
            <input
              type="text"
              className="w-full grow bg-transparent outline-none"
              placeholder="Masukkan nama atau kode kelas..."
              value={searchVal}
              onChange={(e) => {
                handleSearchValChange(e.target.value);
              }}
            />
          </div>

          {/* Buttons */}
          {data && viewVal === RoleEnum.S2_TIM_TESIS && (
            <div className="flex gap-2">
              <Button
                className="flex-auto bg-blue-600 px-2 text-gray-100 hover:bg-blue-600"
                onClick={() => setDialogOpen(true)}
              >
                <Plus size={12} className="mr-2" />
                <p className="text-xs">Tambah Kelas</p>
              </Button>
            </div>
          )}
        </div>

        {/* Daftar Kelas */}
        {data && data.length > 0 ? (
          <div className="flex w-full flex-col gap-2 sm:grid sm:w-fit sm:grid-cols-3 sm:gap-x-4 sm:gap-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {data.map((kelas) => (
              <div
                onClick={() => {}}
                className="cursor-pointer sm:mx-auto sm:max-w-xs"
                key={kelas.id}
              >
                <CardKelas key={kelas.id} dataKelas={kelas} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex w-full justify-center text-lg text-slate-500">
            Tidak ada kelas
          </div>
        )}
      </div>
    </DataContext.Provider>
  );
}
