import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import {
  updateStatusBimbinganLog,
  updateStatusBimbinganLogS2,
} from "../clients";
import { BimbinganLogs } from "../types";

export default function StatusCircle({
  row,
  strata,
}: {
  row: Row<BimbinganLogs>;
  strata: string;
}): JSX.Element {
  const [status, setStatus] = useState(row.original.status);

  const { trigger: triggerS2, error } = useSWRMutation(
    `/bimbingan/pengesahan`,
    async (_, { arg }: { arg: boolean }) => {
      return await updateStatusBimbinganLogS2(row.original.id, arg);
    },
  );

  const updateBimbinganLogStatus = async (id: string, status: boolean) => {
    if (strata.toLowerCase() === "s1") {
      const resUpdate = await updateStatusBimbinganLog(id, status);
      if ((resUpdate.data as any).success) {
        toast.success("Bimbingan log status updated successfully.");
        setStatus(status);
      } else {
        toast.success("Failed to update bimbingan log status updated.");
      }
    } else {
      await triggerS2(status);
      if (!error) {
        toast.success("Bimbingan log status updated successfully.");
        setStatus(status);
      } else {
        toast.success("Failed to update bimbingan log status updated.");
      }
    }
  };

  return (
    <div className="flex justify-center">
      {status ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md border border-gray-500 px-8 py-2 text-gray-500 hover:border-red-500 hover:bg-red-500 hover:text-white">
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
                className="rounded-md border border-red-500 bg-red-500 px-8 py-2 text-white hover:bg-red-700"
                onClick={() => updateBimbinganLogStatus(row.original.id, false)}
              >
                Gagalkan
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <button
          className="w-[100%] rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          onClick={() => updateBimbinganLogStatus(row.original.id, true)}
        >
          Sahkan
        </button>
      )}
    </div>
  );
}
