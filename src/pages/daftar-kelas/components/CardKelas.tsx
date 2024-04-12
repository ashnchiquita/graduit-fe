import { DataKelas } from "../types";

interface CardKelasProps {
  dataKelas: DataKelas;
}

export default function CardKelas({ dataKelas }: CardKelasProps): JSX.Element {
  const cardColors = [
    "bg-blue-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-red-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-cyan-300",
    "bg-amber-300",
    "bg-lime-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-cyan-300",
    "bg-violet-300",
    "bg-fuchsia-300",
    "bg-rose-300",
    "bg-sky-300",
    "bg-cyan-300",
  ];

  const cardColor = cardColors[Math.floor(Math.random() * cardColors.length)];
  const kodeMatkul = dataKelas.mata_kuliah.split(" ")[0];
  const namaMatkul = dataKelas.mata_kuliah.split(" ").slice(1).join(" ");

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-1 sm:w-52">
      <div
        className={`h-20 w-full rounded ${cardColor ? cardColor : "bg-blue-500"}`}
      />
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
