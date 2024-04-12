import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TambahKelasDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleAddKelas: () => void;
}

export default function TambahKelasDialog({
  dialogOpen,
  setDialogOpen,
  handleAddKelas,
}: TambahKelasDialogProps): JSX.Element {
  const [mataKuliah, setMataKuliah] = useState<string>("");
  const [nomorKelas, setNomorKelas] = useState<number>();

  // TODO: Get matakuliah from API

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-[330px] rounded-md md:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Tambah Kelas</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Mata Kuliah</h3>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex w-full items-center justify-between rounded-md border border-gray-300 px-2 py-1">
                <span
                  className={`${mataKuliah.length === 0 ? "text-slate-400" : "text-slate-800"} text-sm`}
                >
                  {mataKuliah.length === 0 ? "Pilih mata kuliah" : mataKuliah}
                </span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setMataKuliah("IF1234 Algoritma dan Struktur Data");
                }}
              >
                <DropdownMenuLabel>IF1234</DropdownMenuLabel>
                <p>Algoritma dan Struktur Data</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setMataKuliah("IF5678 Rekayasa Perangkat Lunak");
                }}
              >
                <DropdownMenuLabel>IF5678</DropdownMenuLabel>
                <p>Rekayasa Perangkat Lunak</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setMataKuliah("IF9101 Manajemen Proyek Perangkat Lunak");
                }}
              >
                <DropdownMenuLabel>IF9101</DropdownMenuLabel>
                <p>Manajemen Proyek Perangkat Lunak</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Nomor Kelas (Opsional)</h3>
          <input
            type="number"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            placeholder="Masukkan nomor kelas"
            value={nomorKelas}
            min={1}
            onChange={(e) => {
              setNomorKelas(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            className="flex h-full border border-gray-300 bg-transparent px-2 text-gray-500 hover:bg-gray-100"
            onClick={() => {
              setMataKuliah("");
              setNomorKelas(undefined);
            }}
          >
            <p className="text-xs">Clear</p>
          </Button>
          <Button
            className="flex h-full bg-blue-500 px-2 text-gray-100 hover:bg-blue-600"
            onClick={() => {
              handleAddKelas();
              setDialogOpen(false);
            }}
          >
            <p className="text-xs">Tambah</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
