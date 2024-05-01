import { CardTitle, CardDescription } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Placeholders } from "../types";

export function DataDiriComponent({
  data,
  strata,
}: {
  data: Placeholders;
  strata: string;
}) {
  return (
    <div className="rounded-lg bg-white px-4 py-3 flex flex-col gap-2">
      <CardTitle> Data Diri </CardTitle>
      <CardDescription> Silahkan cek kembali data diri anda! </CardDescription>
      <div>
        <CardDescription> Nama </CardDescription>
        <Input placeholder={data.name} disabled />
      </div>
      <div>
        <CardDescription> NIM </CardDescription>
        <Input placeholder={data.nim} disabled />
      </div>
      <div>
        <CardDescription> Program Studi </CardDescription>
        <Input placeholder={data.program_studi} disabled />
      </div>
      {strata === "S2" && (
        <div>
          <CardDescription> Jalur Pilihan </CardDescription>
          <Input
            placeholder="Jalur pilihan anda (jika mahasiswa S1 isi dengan program studi)"
            disabled
          />
        </div>
      )}
      <div>
        <CardDescription> Topik </CardDescription>
        <Input placeholder={data.topik} disabled />
      </div>
      <div>
        <CardDescription> Dosen Pembimbing </CardDescription>
        <Input placeholder={data.dosbing} disabled />
      </div>
    </div>
  );
}
