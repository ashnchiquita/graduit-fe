import { DataTable } from "@/components/DataTable";
import StatusPendaftaranBadge from "@/components/StatusPendaftaranBadge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useRekapPendaftaranTimTesis from "./hooks/useApprovalPendaftaranTimTesis";
import { StatusPendaftaranOptions } from "./constants";
import DataContext from "../context/DataContext";

export default function RekapPendaftaranTimTesis(): JSX.Element {
  const { table, searchValue, handleSearchValueChange, refreshData } =
    useRekapPendaftaranTimTesis();

  return (
    <DataContext.Provider value={{ refreshData }}>
      <main className="flex flex-col gap-3.5 px-5 md:px-7">
        <section className="hidden pb-8 md:block">
          <DataTable
            table={table}
            headline="Pengajuan Sidang/Seminar Mahasiswa"
            searchValue={searchValue}
            setSearchValue={handleSearchValueChange}
            searchPlaceholder="Cari nama atau NIM mahasiswa"
            selectFilterPlaceholder="Semua Bimbingan"
            selectFilterOptions={StatusPendaftaranOptions}
          />
        </section>

        <section className="flex w-full flex-col gap-2.5 rounded-lg bg-white px-5 py-4 md:hidden">
          <h2 className="text-lg font-bold">Pengajuan Sidang/Seminar Mahasiswa</h2>

          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-slate-700">Status Pengajuan</p>
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
              <Link key={index} to={`/rekap-pendaftaran/${row.original.nim}`}>
                <li className="flex w-full items-center justify-between gap-2 rounded-lg border border-[#E2E5E8] px-3 py-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium">{row.original.nama}</p>
                    <p className="text-xs font-medium text-gray-500">
                      {row.original.nim}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <StatusPendaftaranBadge status={row.original.status} />
                    <ChevronRightIcon className="size-5" />
                  </div>
                </li>
              </Link>
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
    </DataContext.Provider>
  );
}
