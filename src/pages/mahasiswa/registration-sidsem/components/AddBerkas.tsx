import { CardDescription, CardTitle } from "@/components/Card";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { RegistrationSidSemFormData } from "../constants";

export function AddBerkas({
  form,
}: {
  form: UseFormReturn<RegistrationSidSemFormData>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "berkas",
  });

  const [isTambah, setIsTambah] = useState<boolean>(false);
  const [namaBerkas, setNamaBerkas] = useState("");
  const [linkBerkas, setLinkBerkas] = useState("");

  const changeIsTambah = () => {
    setIsTambah(!isTambah);
  };

  const addBerkasToArr = () => {
    append({ nama: namaBerkas, link: linkBerkas });
    setNamaBerkas("");
    setLinkBerkas("");
    setIsTambah(false);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-4">
      <CardTitle className="text-lg"> Berkas Proposal </CardTitle>
      <CardDescription>
        {" "}
        Silakan unggah berkas proposal Anda pada field di bawah ini. Link berkas
        dapat berupa link Google Drive ataupun OneDrive.{" "}
      </CardDescription>
      <FormField
        control={form.control}
        name="berkas"
        render={() => (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex w-auto content-center items-center gap-2 rounded-lg bg-slate-200 px-2 py-1 font-normal text-muted-foreground"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    {item.nama}
                  </a>
                  <X
                    className="size-4 hover:cursor-pointer"
                    onClick={() => remove(index)}
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
                    className="rounded-md border border-blue-500 px-8 py-2 text-blue-500 hover:bg-gray-100"
                    onClick={() => changeIsTambah()}
                  >
                    Batal
                  </button>
                  <button
                    className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
                    onClick={addBerkasToArr}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
