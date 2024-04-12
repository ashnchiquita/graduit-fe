import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Row } from "@tanstack/react-table";
import { IoEllipsisVertical } from "react-icons/io5";
import useRowAction from "../hooks/useRowAction";
import { DaftarTopikData } from "../types";
import DeleteDialog from "./DeleteDialog";
import UpsertDialog from "./UpsertDialog";

interface ComponentProps {
  row: Row<DaftarTopikData>;
  updateData: () => Promise<any>;
}

export default function RowAction({
  row,
  updateData,
}: ComponentProps): JSX.Element {
  const {
    deleteDialogOpen,
    updateDialogOpen,
    setUpdateDialogOpen,
    setDeteleDialogOpen,
  } = useRowAction();

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
        className="w-[233px] overflow-hidden rounded-md p-0"
      >
        <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-full p-3">
              <p className="w-full text-left text-sm font-medium">
                Update topik
              </p>
            </button>
          </DialogTrigger>
          <UpsertDialog
            row={row}
            closeDialog={() => {
              setDeteleDialogOpen(false);
            }}
            updateData={updateData}
          />
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeteleDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-full p-3">
              <p className="w-full text-left text-sm font-medium text-red-600">
                Hapus topik
              </p>
            </button>
          </DialogTrigger>
          <DeleteDialog
            row={row}
            closeDialog={() => {
              setDeteleDialogOpen(false);
            }}
            updateData={updateData}
          />
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
