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
import RegAcceptDialog from "@/pages/dosen/components/RegAcceptDialog";
import RegRejectDialog from "@/pages/dosen/components/RegRejectDialog";
import { Check, Pencil, X } from "lucide-react";
import EditDosenPembimbingDialog from "../../components/EditDosenPembimbingDialog";

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
    editDosenPembimbingDialogOpen,
    setEditDosenPembimbingDialogOpen,
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
        className="w-[220px] overflow-hidden rounded-md p-0"
      >
        <div className="w-full bg-white">
          {/* Edit Dialog */}
          <EditDosenPembimbingDialog
            open={editDosenPembimbingDialogOpen}
            setOpen={setEditDosenPembimbingDialogOpen}
            nim={row.original.nim}
          />

          {/* Accept Dialog */}
          <RegAcceptDialog
            acceptDialogOpen={acceptDialogOpen}
            setAcceptDialogOpen={setAcceptDialogOpen}
            name={row.original.nama}
            onAccept={() => handleAccept(row.original.nim)}
            dialogTrigger={<></>}
          />

          {/* Reject Dialog */}
          <RegRejectDialog
            rejectDialogOpen={rejectDialogOpen}
            setRejectDialogOpen={setRejectDialogOpen}
            name={row.original.nama}
            onReject={() => handleReject(row.original.nim)}
            dialogTrigger={<></>}
          />

          <div className="w-full p-3">
            <Link
              to={`/rekap-pendaftaran-tim-tesis/${row.original.nim}`}
              className="flex w-full items-center gap-3 text-sm font-medium text-slate-700"
            >
              <PiClockCounterClockwise className="size-4" />
              Lihat Riwayat Pengajuan
            </Link>
          </div>

          <hr />

          <div className="w-full p-3">
            <button
              onClick={() => setEditDosenPembimbingDialogOpen(true)}
              className="flex w-full items-center gap-3 text-sm font-medium text-slate-700"
            >
              <Pencil className="mr-1 size-4" />
              Edit Dosen Pembimbing
            </button>
          </div>

          <hr />

          <div className="w-full p-3">
            <button
              onClick={() => setAcceptDialogOpen(true)}
              className="flex w-full items-center gap-3 text-sm font-medium text-blue-500"
            >
              <Check className="mr-1 size-4" />
              Terima Pengajuan
            </button>
          </div>

          <hr />

          <div className="w-full p-3">
            <button
              onClick={() => setRejectDialogOpen(true)}
              className="flex w-full items-center gap-3 text-sm font-medium text-red-500"
            >
              <X className="mr-1 size-4" />
              Tolak Pengajuan
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
