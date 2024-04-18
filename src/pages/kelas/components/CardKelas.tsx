import { VscTrash } from "react-icons/vsc";
import { DataKelas } from "../daftar-kelas/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HapusKelasDialog from "./HapusKelasDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CardKelasProps {
  dataKelas: DataKelas;
}

export default function CardKelas({ dataKelas }: CardKelasProps): JSX.Element {
  const kodeMatkul = dataKelas.kode_mata_kuliah;
  const namaMatkul = dataKelas.nama_mata_kuliah;
  const nomorKelas = dataKelas.nomor;

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Link to={`#`}>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-1 sm:w-52">
        {/* Delete Kelas Dialog */}
        <HapusKelasDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          mataKuliahKode={kodeMatkul}
          nomor={dataKelas.nomor.toString()}
        />
        <div className={`h-20 w-full rounded ${dataKelas.warna}`} />
        <div className="flex flex-col gap-1 px-1.5 pb-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <p className="text-xs text-slate-400">{kodeMatkul}</p>
              {/* Vertical line */}
              <div className="h-3 w-[0.5px] bg-gray-400" />
              <p className="text-xs text-green-400">{dataKelas.nomor}</p>
            </div>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <button onClick={() => setDialogOpen(true)}>
                    <VscTrash className="text-red-500/50 hover:text-red-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Hapus {nomorKelas} {kodeMatkul}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <h2 className="text-sm font-medium text-slate-800">{namaMatkul}</h2>
          <p className="text-xs text-blue-500">
            {dataKelas.jumlah_mahasiswa} Mahasiswa
          </p>
        </div>
      </div>
    </Link>
  );
}
