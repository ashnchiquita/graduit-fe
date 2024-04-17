import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PendaftaranTopik } from "../types";
import useRowAction from "../hooks/useRowAction";
import { PiClockCounterClockwise } from "react-icons/pi";
import RegAcceptDialog from "@/pages/dosen/components/RegAcceptDialog";
import RegRejectDialog from "@/pages/dosen/components/RegRejectDialog";
import { Check, Pencil, X } from "lucide-react";
import EditDosenPembimbingDialog from "../../components/EditDosenPembimbingDialog";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import { mutate } from "swr";

interface ComponentProps {
  row: Row<PendaftaranTopik>;
}

export default function RowAction({ row }: ComponentProps): JSX.Element {
  const {
    isPopoverOpen,
    setIsPopoverOpen,
    acceptDialogOpen,
    setAcceptDialogOpen,
    rejectDialogOpen,
    setRejectDialogOpen,
    editDosenPembimbingDialogOpen,
    setEditDosenPembimbingDialogOpen,
    handleAccept,
    handleReject,
  } = useRowAction({
    idMahasiswa: row.original.id,
  });

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
            nim={row.original.id}
          />

          {/* Accept Dialog */}
          <RegAcceptDialog
            acceptDialogOpen={acceptDialogOpen}
            setAcceptDialogOpen={setAcceptDialogOpen}
            name={row.original.nama}
            onAccept={() => {
              handleAccept(row.original.id);
              setIsPopoverOpen(false);
              mutate("/registrasi-tesis");
            }}
            dialogTrigger={<></>}
          />

          {/* Reject Dialog */}
          <RegRejectDialog
            rejectDialogOpen={rejectDialogOpen}
            setRejectDialogOpen={setRejectDialogOpen}
            name={row.original.nama}
            onReject={() => {
              handleReject(row.original.id);
              setIsPopoverOpen(false);
              mutate("/registrasi-tesis");
            }}
            dialogTrigger={<></>}
          />

          <div className="w-full p-3">
            <Link
              to={`/rekap-pendaftaran-tim-tesis/${row.original.id}`}
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

          {/* Accept and Reject Options */}
          {(row.original.status === StatusPendaftaranEnum.PROCESS ||
            row.original.status === StatusPendaftaranEnum.REJECTED) && (
            <div className="w-full p-3">
              <button
                onClick={() => setAcceptDialogOpen(true)}
                className="flex w-full items-center gap-3 text-sm font-medium text-blue-500"
              >
                <Check className="mr-1 size-4" />
                Terima Pengajuan
              </button>
            </div>
          )}

          {(row.original.status === StatusPendaftaranEnum.PROCESS ||
            row.original.status === StatusPendaftaranEnum.ACCEPTED) && (
            <>
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
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
