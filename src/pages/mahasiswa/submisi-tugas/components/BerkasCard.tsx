import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormMessage } from "@/components/ui/form";
import { SubmitTugasFormData } from "../types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import useBerkas from "../hooks/useBerkas";
import { Link } from "react-router-dom";

export function BerkasCard({
  form,
}: {
  form: UseFormReturn<SubmitTugasFormData>;
}) {
  const {
    handleRemove,
    changeIsTambah,
    addBerkasToArr,
    setNamaBerkas,
    setLinkBerkas,
    isTambah,
    namaBerkas,
    linkBerkas,
    fields,
  } = useBerkas(form);

  return (
    <Card
      HeaderElement={
        <CardHeader>
          <CardTitle>Berkas Terkait</CardTitle>
          <CardDescription>
            Silakan unggah berkas-berkas terkait submisi tugas ini.{" "}
            <span className="font-semibold">Bagian ini bersifat opsional.</span>
          </CardDescription>
        </CardHeader>
      }
      ContentElement={
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="berkas"
            render={() => (
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex flex-wrap gap-3">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex w-auto content-center gap-2 rounded-lg bg-slate-200 px-2 py-1 font-normal text-muted-foreground"
                    >
                      <Link
                        to={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        {item.nama}
                      </Link>
                      <X
                        className="mt-[5.5px] size-4 hover:cursor-pointer"
                        onClick={() => handleRemove(index)}
                      />
                    </div>
                  ))}
                </div>
                {!isTambah ? (
                  <button
                    className="flex w-[160px] gap-3 rounded-lg border border-[#EAECF0] p-2 font-normal text-muted-foreground hover:bg-gray-100"
                    onClick={() => changeIsTambah()}
                  >
                    <Plus className="size-5 opacity-50" />
                    <span className="text-sm capitalize">Tambah Berkas</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 md:flex-row">
                    <Input
                      placeholder="Nama Berkas"
                      value={namaBerkas}
                      onChange={(e) => setNamaBerkas(e.target.value)}
                    />
                    <Input
                      placeholder="Link Berkas"
                      value={linkBerkas}
                      onChange={(e) => setLinkBerkas(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        className="rounded-md border border-blue-500 px-8 py-2 text-sm text-blue-500 hover:bg-gray-100"
                        type="button"
                        onClick={() => changeIsTambah()}
                      >
                        Batal
                      </button>
                      <button
                        className="rounded-md bg-blue-500 px-5 py-2 text-sm text-white hover:bg-blue-600"
                        type="button"
                        onClick={addBerkasToArr}
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                )}
                <FormMessage />
              </div>
            )}
          />
        </div>
      }
    />
  );
}
