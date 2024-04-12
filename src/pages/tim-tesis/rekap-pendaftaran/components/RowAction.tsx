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
import RegAcceptDialog from "@/pages/dosen/components/RegAcceptDialog";
import RegRejectDialog from "@/pages/dosen/components/RegRejectDialog";
import { Pencil } from "lucide-react";

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
        <div className="w-48 bg-white">
          <div className="w-full p-3">
            <Link
              to={`/rekap-pendaftaran-tim-tesis/#`}
              className="flex w-full items-center gap-3 text-xs font-medium text-slate-700"
            >
              <PiClockCounterClockwise className="size-4" />
              Lihat Riwayat Pengajuan
            </Link>
          </div>

          <hr />

          <div className="w-full p-3">
            <Link
              to={`/rekap-pendaftaran-tim-tesis/#`}
              className="flex w-full items-center gap-3 text-xs font-medium text-slate-700"
            >
              <Pencil className="mr-1 size-3" />
              Edit Dosen Pembimbing
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
                <RegAcceptDialog
                  acceptDialogOpen={acceptDialogOpen}
                  setAcceptDialogOpen={setAcceptDialogOpen}
                  name={row.original.nama}
                  onAccept={() => handleAccept(row.original.nim)}
                  dialogTrigger={
                    <button className="w-full p-3 text-left text-xs">
                      Diterima
                    </button>
                  }
                />

                {/* Reject Dialog */}
                <RegRejectDialog
                  rejectDialogOpen={rejectDialogOpen}
                  setRejectDialogOpen={setRejectDialogOpen}
                  name={row.original.nama}
                  onReject={() => handleReject(row.original.nim)}
                  dialogTrigger={
                    <button className="w-full p-3 text-left text-xs">
                      Ditolak
                    </button>
                  }
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
