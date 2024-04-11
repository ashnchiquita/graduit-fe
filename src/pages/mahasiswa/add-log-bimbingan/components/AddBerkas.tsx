import { Berkas } from "../types";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const berkas_dummy: Berkas[] = [
  { nama: "tes berkas1", link: "test_link" },
  { nama: "tes berkas2", link: "test_link" },
  { nama: "tes berkas3", link: "test_link" },
  { nama: "tes berkas4", link: "test_link" },
];

export function AddBerkas() {
  const [berkas, setBerkas] = useState<Berkas[]>([]);
  const [isTambah, setIsTambah] = useState<boolean>(false);
  const [namaBerkas, setNamaBerkas] = useState("");
  const [linkBerkas, setLinkBerkas] = useState("");

  useEffect(() => {
    setBerkas(berkas_dummy);
  }, []);

  const deleteBerkas = (index: number) => {
    setBerkas((currentBerkas) =>
      currentBerkas.filter((_, idx) => idx !== index),
    );
  };

  const changeIsTambah = () => {
    setIsTambah(!isTambah);
  };

  const addBerkasToArr = () => {
    const newBerkas: Berkas = {
      nama: namaBerkas,
      link: linkBerkas,
    };
    setBerkas([...berkas, newBerkas]);
    setNamaBerkas("");
    setLinkBerkas("");
    setIsTambah(false); // Optionally close the add form
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex flex-wrap gap-3">
        {berkas.map((item, index) => (
          <div
            key={index}
            className="rounded-lg w-auto font-normal flex text-muted-foreground bg-slate-200 px-2 py-1 content-center gap-2"
          >
            <a href={item.link} className="text-gray-600 hover:underline">
              {item.nama}
            </a>
            <X
              className="size-4 mt-[5.5px] hover:cursor-pointer"
              onClick={() => deleteBerkas(index)}
            />
          </div>
        ))}
      </div>
      {!isTambah ? (
        <button
          className="rounded-lg w-[160px] font-normal flex text-muted-foreground gap-3 border border-[#EAECF0] p-2 hover:bg-gray-100"
          onClick={() => changeIsTambah()}
        >
          <Plus className="size-5 opacity-50" />
          <span className="capitalize text-sm">Tambah Berkas</span>
        </button>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
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
  );
}
