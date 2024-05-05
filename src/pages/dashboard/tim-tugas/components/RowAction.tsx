import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiClockCounterClockwise } from "react-icons/pi";
import { Link } from "react-router-dom";
import useRowAction from "../hooks/useRowAction";
import { DashTableData } from "../types";
import ArchiveDialog from "./ArchiveDialog";

interface ComponentProps {
  row: Row<DashTableData>;
  searchValue: string;
  fetchData: () => Promise<any>;
}

export default function RowAction({
  row,
  fetchData,
}: ComponentProps): JSX.Element {
  const { archiveDialogOpen, setArchiveDialogOpen, handleArchive } =
    useRowAction(row.original.id, fetchData);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <IoEllipsisVertical className="text-[#94A3B8]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="w-[200px] overflow-hidden rounded-md p-0"
      >
        <div className="size-full bg-white">
          <div className="w-full p-3">
            <Link
              to={`/detail-mahasiswa/${row.original.nim}`}
              className="flex w-full items-center gap-3 text-xs font-medium text-slate-700"
            >
              <PiClockCounterClockwise className="size-4" />
              Lihat Detail Mahasiswa
            </Link>
          </div>

          <hr />

          <ArchiveDialog
            archiveDialogOpen={archiveDialogOpen}
            setArchiveDialogOpen={setArchiveDialogOpen}
            name={row.original.nama}
            onArchive={() => handleArchive()}
            dialogTrigger={
              <button className="flex w-full items-center gap-3 p-3 text-xs font-medium text-red-400">
                <HiOutlineDocument className="size-4" />
                Arsipkan Data Mahasiswa
              </button>
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
