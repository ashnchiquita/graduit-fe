import { Row } from "@tanstack/react-table";
import { BimbinganLogs } from "../types";
import { updateStatusBimbinganLog } from "../clients";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function StatusCircle({
  row,
}: {
  row: Row<BimbinganLogs>;
}): JSX.Element {
  const [status, setStatus] = useState(row.original.status);

  const updateBimbinganLogStatus = async (id: string, status: boolean) => {
    await updateStatusBimbinganLog(id, status);
    setStatus(status);
  };

  return (
    <div className="flex justify-center">
      {status ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md border border-gray-500 px-8 py-2 text-gray-500 hover:bg-red-500 hover:border-red-500 hover:text-white">
              Batalkan pengesahan
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Yakin untuk membatalkan kesahan status bimbingan tanggal{" "}
                {row.original.tanggal}.
              </DialogTitle>
              <DialogDescription>
                Aksi ini tidak bisa dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <button className="rounded-md border border-gray-500 px-8 py-2 text-black hover:bg-gray-100">
                  Kembali
                </button>
              </DialogClose>
              <button
                className="rounded-md border border-red-500 px-8 py-2 bg-red-500 text-white hover:bg-red-700"
                onClick={() => updateBimbinganLogStatus(row.original.id, false)}
              >
                Gagalkan
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <button
          className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 w-[100%]"
          onClick={() => updateBimbinganLogStatus(row.original.id, true)}
        >
          Sahkan
        </button>
      )}
    </div>
  );
}
