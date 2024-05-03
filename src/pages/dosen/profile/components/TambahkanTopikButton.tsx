import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";

export default function TambahkanTopikButton() {
  // TODO add tambah topik api call

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-2 rounded-md bg-blue-500 px-3 py-1 text-white font-light hover:bg-blue-600 ml-auto">
          <FaRegEdit className="mt-1" />
          Tambahkan Topik
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan Topik</DialogTitle>
          <DialogDescription className="">
            <br />
            Judul Topik
            <Input placeholder="Masukkan judul topik disini..." />
            <br />
            Deskripsi Topik
            <Textarea placeholder="Masukkan deskripsi disini..." />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="rounded-md border border-blue-500 px-8 py-2 bg-blue-500 text-white hover:bg-blue-700"
            onClick={() => console.log("halo")} // TODO change this
          >
            Tambahkan
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
