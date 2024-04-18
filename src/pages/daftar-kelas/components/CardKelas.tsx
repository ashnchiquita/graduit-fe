import { DataKelas } from "../types";

interface CardKelasProps {
  dataKelas: DataKelas;
}

export default function CardKelas({ dataKelas }: CardKelasProps): JSX.Element {
  const kodeMatkul = dataKelas.kode_mata_kuliah;
  const namaMatkul = dataKelas.nama_mata_kuliah;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-1 sm:w-52">
      <div className={`h-20 w-full rounded ${dataKelas.warna}`} />
      <div className="flex flex-col gap-1 px-1.5 pb-2">
        <div className="flex items-center gap-1.5 font-medium">
          <p className="text-xs text-slate-400">{kodeMatkul}</p>
          {/* Vertical line */}
          <div className="h-3 w-[0.5px] bg-gray-400" />
          <p className="text-xs text-green-400">{dataKelas.nomor}</p>
        </div>
        <h2 className="text-sm font-medium text-slate-800">{namaMatkul}</h2>
        <p className="text-xs text-blue-500">
          {dataKelas.jumlah_mahasiswa} Mahasiswa
        </p>
      </div>
    </div>
  );
}
