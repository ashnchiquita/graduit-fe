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
import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { addKelas, getDaftarMataKuliah } from "../daftar-kelas/client";
import useSWRMutation from "swr/mutation";
import { MataKuliah } from "../daftar-kelas/types";
import { useData } from "../context/DataContext";

interface TambahKelasDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export default function TambahKelasDialog({
  dialogOpen,
  setDialogOpen,
}: TambahKelasDialogProps): JSX.Element {
  const [mataKuliah, setMataKuliah] = useState<MataKuliah>({
    kode: "",
    nama: "",
  });
  const [nomorKelas, setNomorKelas] = useState<number>();

  const { refreshData } = useData();

  useEffect(() => {
    if (!dialogOpen) {
      setTimeout(() => {
        setMataKuliah({
          kode: "",
          nama: "",
        });
        setNomorKelas(undefined);
      }, 100);
    }
  }, [dialogOpen]);

  const { data: mataKuliahOptions } = useSWR("/kelas/mata-kuliah", async () => {
    try {
      const res = await getDaftarMataKuliah();

      return res.data;
    } catch (error) {
      toast.error("Gagal memuat data mata kuliah");
    }
  });

  const { trigger: triggerAddKelas } = useSWRMutation("/kelas", async () => {
    try {
      await addKelas(mataKuliah.kode, nomorKelas);
      setDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menambahkan kelas");
    }
  });

  const handleSubmit = async () => {
    if (!mataKuliah || mataKuliah.kode.length === 0) {
      toast.error("Mata kuliah harus diisi");
      return;
    }

    await triggerAddKelas();
    refreshData();

    toast.success("Kelas berhasil ditambahkan");
  };

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
                  className={`${!mataKuliah || mataKuliah.nama.length === 0 ? "text-slate-400" : "text-slate-800"} text-sm`}
                >
                  {!mataKuliah || mataKuliah.nama.length === 0
                    ? "Pilih mata kuliah"
                    : `${mataKuliah.kode} ${mataKuliah.nama}`}
                </span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {mataKuliahOptions?.map((mataKuliah, index) => (
                <>
                  <DropdownMenuItem
                    key={mataKuliah.kode}
                    onClick={() => {
                      setMataKuliah(mataKuliah);
                    }}
                  >
                    <DropdownMenuLabel>{mataKuliah.kode}</DropdownMenuLabel>
                    <p>{mataKuliah.nama}</p>
                  </DropdownMenuItem>
                  {index < mataKuliahOptions.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </>
              ))}
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
              setMataKuliah({
                kode: "",
                nama: "",
              });
              setNomorKelas(undefined);
            }}
          >
            <p className="text-xs">Clear</p>
          </Button>
          <Button
            className="flex h-full bg-blue-500 px-2 text-gray-100 hover:bg-blue-600"
            onClick={() => {
              handleSubmit();
            }}
          >
            <p className="text-xs">Tambah</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
