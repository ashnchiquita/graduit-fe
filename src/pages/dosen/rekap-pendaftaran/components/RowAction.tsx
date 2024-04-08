import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Mahasiswa } from "../types";
import useRowAction from "../hooks/useRowAction";
import { PiClockCounterClockwise } from "react-icons/pi";
import { HiOutlineDocument } from "react-icons/hi2";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

interface ComponentProps {
  row: Row<Mahasiswa>;
  setData: React.Dispatch<React.SetStateAction<Mahasiswa[]>>;
}

export default function RowAction({
  row,
  setData,
}: ComponentProps): JSX.Element {
  const {
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    handleAccept,
    handleReject,
  } = useRowAction({
    setData,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={() => console.log(row)}>
          <IoEllipsisVertical className="text-[#94A3B8]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="w-[183px] overflow-hidden rounded-md p-0"
      >
        <div className="size-full bg-white">
          <div className="w-full p-3">
            <Link
              to={`/manajemen/kelola-akun/${row.original.nim}`}
              className="flex w-full items-center gap-3 text-xs font-medium text-slate-700"
            >
              <PiClockCounterClockwise className="size-4" />
              Lihat Detail Pengajuan
            </Link>
          </div>

          <hr />

          {row.original.status === StatusPendaftaranEnum.PROCESS && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center gap-3 p-3 text-xs font-medium text-red-400">
                  <HiOutlineDocument className="size-4" />
                  Ubah Status Pengajuan
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[100px] p-0">
                {/* Accept Dialog */}
                <Dialog
                  open={acceptDialogOpen}
                  onOpenChange={setAcceptDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="w-full p-3 text-left text-xs">
                      Diterima
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="gap-2">
                      <DialogTitle>
                        Yakin untuk menerima pengajuan {row.original.nama}?
                      </DialogTitle>
                      <DialogDescription>
                        Aksi ini tidak bisa dibatalkan.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-8 flex w-full justify-end gap-2">
                      <DialogClose asChild>
                        <Button
                          className="gap-4 border-2 border-slate-200 bg-white text-primary hover:bg-slate-100"
                          type="submit"
                        >
                          Kembali
                        </Button>
                      </DialogClose>
                      <Button
                        className="bg-blue-500 px-4 text-gray-100 hover:bg-blue-600"
                        type="submit"
                        onClick={() => handleAccept(row.original.nim)}
                      >
                        Terima
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Reject Dialog */}
                <Dialog
                  open={rejectDialogOpen}
                  onOpenChange={setRejectDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="w-full p-3 text-left text-xs">
                      Ditolak
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="gap-2">
                      <DialogTitle>
                        Yakin untuk menolak pengajuan {row.original.nama}?
                      </DialogTitle>
                      <DialogDescription>
                        Aksi ini tidak bisa dibatalkan.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-8 flex w-full justify-end gap-2">
                      <DialogClose asChild>
                        <Button
                          className="gap-4 border-2 border-slate-200 bg-white text-primary hover:bg-slate-100"
                          type="submit"
                        >
                          Kembali
                        </Button>
                      </DialogClose>
                      <Button
                        className="bg-red-500 px-4 text-gray-100 hover:bg-red-600"
                        type="submit"
                        onClick={() => handleReject(row.original.nim)}
                      >
                        Tolak
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
