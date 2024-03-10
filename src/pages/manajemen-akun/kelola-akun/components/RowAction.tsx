import { IoEllipsisVertical } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import { Account } from "../hooks/useKelolaAkun";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useRowAction from "../hooks/useRowAction";

interface ComponentProps {
  row: Row<Account>;
  refetchAccounts: (search: string) => Promise<void>;
}

export default function RowAction({
  row,
  refetchAccounts,
}: ComponentProps): JSX.Element {
  const { handleDelete, dialogOpen, setDialogOpen } =
    useRowAction(refetchAccounts);

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
        <div className="size-full bg-white">
          <div className="w-full p-3">
            <Link
              to={`/manajemen/kelola-akun/${row.original.id}`}
              className="block w-full text-sm font-medium text-slate-700"
            >
              Lihat Detail
            </Link>
          </div>

          <hr />

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full p-3">
                <p className="w-full text-left text-sm font-medium text-red-600">
                  Hapus
                </p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="gap-2">
                <DialogTitle>Hapus {row.original.email}?</DialogTitle>
                <DialogDescription>
                  Akun yang sudah dihapus tidak dapat dikembalikan dan seluruh
                  data yang berkaitan akan dihapus.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 flex w-full justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    className="gap-4 border-2 border-slate-200 bg-white text-primary hover:bg-slate-100"
                    type="submit"
                  >
                    Batalkan
                  </Button>
                </DialogClose>
                <Button
                  className="bg-red-500 px-4 text-gray-100 hover:bg-red-600"
                  type="submit"
                  onClick={() => handleDelete(row.original.id)}
                >
                  Hapus
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
