import { DataTable } from "@/components/DataTable";
import useRekapPendaftaranDosbim from "./hooks/useRekapPendaftaranDosbim";
import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";

export default function RekapPendaftaranDosbim(): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    statusFilter,
    handleStatusFilterChange,
  } = useRekapPendaftaranDosbim();

  return (
    <main className="flex flex-col gap-3.5 px-5 md:px-7">
      <section className="hidden h-[236px] w-full rounded-lg bg-white px-6 py-3 text-slate-900 md:block">
        <h2 className="text-lg font-medium">Statistik</h2>
      </section>

      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Pengajuan Mahasiswa"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari nama atau NIM mahasiswa"
        />
      </section>

      <section className="flex w-full flex-col gap-2.5 rounded-lg bg-white px-6 py-4 md:hidden">
        <h2 className="text-lg font-bold">Rekap Pendaftaran</h2>

        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-slate-700">Status Pengajuan</p>

          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[120px] border-none text-xs">
              <SelectValue placeholder="Semua" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="semua" className="text-xs">
                Semua
              </SelectItem>
              {Object.values(StatusPendaftaranEnum).map((status) => (
                <SelectItem key={status} value={status} className="text-xs">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="group flex w-full items-center gap-2 rounded-md border border-input bg-transparent p-2 text-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            className="flex-auto outline-none"
            placeholder="Cari nama atau NIM mahasiswa"
            value={searchValue}
            onChange={(e) => {
              handleSearchValueChange(e.target.value);
            }}
          />
        </div>

        <ul className="flex flex-col gap-2.5">
          {table.getRowModel().rows.map((row, index) => (
            <li
              key={index}
              className="flex w-full items-center justify-between rounded-lg border border-[#E2E5E8] px-3 py-4"
            >
              <div>
                <p className="text-xs font-medium">{row.original.nama}</p>
                <p className="text-xs font-medium text-gray-500">
                  {row.original.nim}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <StatusPendaftaranBadge status={row.original.status} />
                <ChevronRightIcon className="size-5" />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div className="flex w-[100px] items-center justify-center text-xs font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(0);
                table.resetRowSelection();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                table.previousPage();
                table.resetRowSelection();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                table.nextPage();
                table.resetRowSelection();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                table.resetRowSelection();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
