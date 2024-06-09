import { CardDescription, CardTitle } from "@/components/Card";
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
    <div className="flex flex-col gap-1 rounded-lg bg-white p-4">
      <CardTitle className="text-lg">Data Diri</CardTitle>
      <CardDescription className="mb-4">
        {" "}
        Silahkan cek kembali data diri anda!{" "}
      </CardDescription>
      <div className="mb-3 flex w-full flex-col gap-2">
        <CardDescription> Nama </CardDescription>
        <Input placeholder={data.name} disabled />
      </div>
      <div className="mb-3 flex w-full flex-col gap-2">
        <CardDescription> NIM </CardDescription>
        <Input placeholder={data.nim} disabled />
      </div>
      {strata === "S2" && (
        <div className="mb-3 flex w-full flex-col gap-2">
          <CardDescription> Jalur Pilihan </CardDescription>
          <Input value={data.jalur_pilihan} disabled />
        </div>
      )}
      <div className="mb-3 flex w-full flex-col gap-2">
        <CardDescription> Topik </CardDescription>
        <Input placeholder={data.topik} disabled />
      </div>
      <div className="mb-3 flex w-full flex-col gap-2">
        <CardDescription> Dosen Pembimbing </CardDescription>
        <Input placeholder={data.dosbing} disabled />
      </div>
    </div>
  );
}
