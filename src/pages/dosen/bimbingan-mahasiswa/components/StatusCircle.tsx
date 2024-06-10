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
import { updatePengesahanS2, updateStatusBimbinganLog } from "../clients";
import { BimbinganLogs } from "../types";

export default function StatusCircle({
  strata,
  mhsId,
  row,
}: {
  strata: "S1" | "S2";
  mhsId: string;
  row: Row<BimbinganLogs>;
}) {
  const [status, setStatus] = useState(row.original.status);

  const { trigger: triggerUpdateS2 } = useSWRMutation(
    `/bimbingan/${mhsId}`,
    async (_, { arg }: { arg: boolean }) =>
      await updatePengesahanS2(row.original.id, arg),
  );

  const updateBimbinganLogStatus = async (id: string, status: boolean) => {
    const toastId = toast.loading("Mengubah status pengesahan...");
    if (strata?.toUpperCase() === "S1") {
      const resUpdate = await updateStatusBimbinganLog(id, status);
      if ((resUpdate.data as any).success) {
        toast.update(toastId, {
          render: "Berhasil mengubah status pengesahan",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setStatus(status);
      } else {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah status pengesahan",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } else {
      try {
        await triggerUpdateS2(status);
        toast.update(toastId, {
          render: "Berhasil mengubah status pengesahan",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      } catch (error) {
        toast.update(toastId, {
          render: "Terjadi kesalahan dalam mengubah status pengesahan",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div className="flex justify-center">
      {status ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="truncate rounded-md border border-gray-500 px-3 py-2 text-gray-500 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white">
              Batalkan pengesahan
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Yakin untuk membatalkan kesahan status bimbingan tanggal{" "}
                {row.original.tanggal}?
              </DialogTitle>
              <DialogDescription>
                Aksi ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <br />
            <DialogFooter>
              <DialogClose>
                <button className="rounded-md border border-gray-500 px-3 py-2 text-sm text-black hover:bg-gray-100">
                  Kembali
                </button>
              </DialogClose>
              <button
                className="rounded-md border border-red-500 bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-700"
                onClick={() => updateBimbinganLogStatus(row.original.id, false)}
              >
                Gagalkan
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <button
          className="w-full rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          onClick={() => updateBimbinganLogStatus(row.original.id, true)}
        >
          Sahkan
        </button>
      )}
    </div>
  );
}
