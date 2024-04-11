import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import AddLogBimbinganCard from "./components/AddLogBimbinganCard";

export default function AddLogBimbingan() {
  const tanggalBimbinganTitle = "Tanggal Bimbingan";
  const tanggalBimbinganDesc = "Pilih tanggal dilaksanakannya bimbingan ini.";
  const rencanaBimbinganTitle = "Rencana Bimbingan Selanjutnya";
  const rencanaBimbinganDesc = "Rencanakan tanggal bimbingan selanjutnya.";
  const laporanKemajuanTitle = "Laporan Kemajuan";
  const laporanKemajuanDesc =
    "Tuliskan kemajuan progres pengerjaan Tugas Akhir Anda.";
  const todoTitle = "To-do";
  const todoDesc = "Tuliskan hal-hal yang harus Anda lakukan selanjutnya";

  return (
    <main className="pl-5 pr-3 flex flex-col gap-6 pb-10">
      <Card
        leftHighlight
        HeaderElement={
          <CardHeader>
            <CardTitle>Pengisian Log Bimbingan</CardTitle>
            <CardDescription>
              Silakan isi log bimbingan setelah melakukan bimbingan dengan dosen
              pembimbing
            </CardDescription>
          </CardHeader>
        }
      />
      <AddLogBimbinganCard
        title={tanggalBimbinganTitle}
        descriprion={tanggalBimbinganDesc}
        optional={false}
        type="date"
      />
      <AddLogBimbinganCard
        title={laporanKemajuanTitle}
        descriprion={laporanKemajuanDesc}
        optional={false}
        type="text"
      />
      <AddLogBimbinganCard
        title={todoTitle}
        descriprion={todoDesc}
        optional={false}
        type="text"
      />
      <AddLogBimbinganCard
        title={todoTitle}
        descriprion={todoDesc}
        optional={false}
        type="berkas"
      />
      <AddLogBimbinganCard
        title={rencanaBimbinganTitle}
        descriprion={rencanaBimbinganDesc}
        optional={true}
        type="date"
      />
      <div className="px-4 flex flex-col gap-5">
        <CardDescription>
          Mohon periksa kembali seluruh bagian sebelum mengirimkan formulir
        </CardDescription>
        <div className="flex gap-2">
          <button className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 mr-auto">
            Kirim
          </button>
          <button className="text-blue-500 hover:underline">
            Hapur Formulir
          </button>
        </div>
      </div>
    </main>
  );
}
