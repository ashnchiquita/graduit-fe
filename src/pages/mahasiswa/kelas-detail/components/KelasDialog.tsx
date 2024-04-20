// import { DialogContent } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MdOutlineClass } from "react-icons/md";
import { VscInfo } from "react-icons/vsc";

export type KelasDialogProps = {
  dosen: {
    id: string;
    nama: string;
  }[];
  mahasiswa: {
    id: string;
    nama: string;
    nim: string;
  }[];
};

function capitalizeTwo(str: string) {
  return str.match(/\b\w/g)?.splice(0, 2).join("");
}

export default function KelasDialog(props: KelasDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <VscInfo size={24} className="text-gray-600" />
      </DialogTrigger>
      <DialogContent className="flex border-0 p-0">
        <div className="w-[50%] rounded-l-lg bg-[#F3F3F3] py-11 pl-4 pr-5">
          <h1 className="pb-3 text-lg font-semibold">Dosen Kelas</h1>
          <ul className="flex max-h-[300px] flex-col gap-2 overflow-y-auto">
            {props.dosen.map((dosen) => (
              <li
                key={dosen.id}
                className="flex gap-4 rounded-lg bg-gray-200 py-3 pl-4 pr-5"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-blue-800 text-lg text-white">
                  {capitalizeTwo(dosen.nama)}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-black">{dosen.nama}</p>
                  <p className="text-xs text-gray-700">Dosen Kelas</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[50%] rounded-r-lg bg-white py-11 pr-3">
          <div className="flex justify-between pb-3">
            <h1 className="text-lg font-semibold">Peserta Kelas</h1>
            <div className="inline-flex items-center gap-1 pr-2 text-gray-600">
              <MdOutlineClass size={13} />
              <p className="text-xs">{props.mahasiswa.length} Mahasiswa</p>
            </div>
          </div>
          <ul className="flex max-h-[300px] flex-col overflow-y-auto border-t border-gray-200">
            {props.mahasiswa.map((mahasiswa) => (
              <li
                key={mahasiswa.id}
                className="flex gap-4 border-b border-gray-200 py-3 pr-5"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-pink-200 text-lg text-pink-400">
                  {capitalizeTwo(mahasiswa.nama)}
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-700">{mahasiswa.nim}</p>
                  <p className="text-sm text-black">{mahasiswa.nama}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
