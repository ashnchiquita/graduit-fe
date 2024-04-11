import { DataTable } from "@/components/DataTable";
import TaskHeader from "../components/TaskHeader";
import useSubmissionTugas from "./hooks/useSubmissionTugas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import StatusTugasBadge from "./components/StatusTugasBadge";
import { Button } from "@/components/ui/button";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

export default function SubmissionTugas(): JSX.Element {
  const {
    data,
    searchValue,
    handleSearchValueChange,
    table,
    statusFilter,
    handleStatusFilterChange,
    idTugas,
  } = useSubmissionTugas();

  return (
    <main className="flex flex-col gap-3.5 px-4 pb-10">
      <TaskHeader
        title={data.tugas}
        course={data.namaMatkul}
        startTime={data.waktuMulai}
        description={data.deskripsiTugas}
        endTime={data.waktuSelesai}
        creatorName={data.namaPembuat}
        createdAt={data.waktuDibuat}
        editorName={data.namaPengubah}
        editedAt={data.waktuDiubah}
        files={data.berkasTugas.map((berkas) => ({
          title: berkas.nama,
          link: berkas.link,
        }))}
        changeDetail
      />

      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Daftar Mahasiswa"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari nama atau NIM mahasiswa"
          customElementsLeft={
            <>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="h-fit text-xs">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="semua" className="text-xs">
                    Semua
                  </SelectItem>
                  <SelectItem value="true" className="text-xs">
                    Selesai
                  </SelectItem>
                  <SelectItem value="false" className="text-xs">
                    Belum Mengerjakan
                  </SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />
      </section>

      <section className="flex w-full flex-col gap-2.5 rounded-lg bg-white px-5 py-4 md:hidden">
        <h2 className="text-lg font-bold">Daftar Mahasiswa</h2>

        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-slate-700">Status Pengerjaan</p>

          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[150px] border-none text-xs">
              <SelectValue placeholder="Semua" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="semua" className="text-xs">
                Semua
              </SelectItem>
              <SelectItem value="true" className="text-xs">
                Selesai
              </SelectItem>
              <SelectItem value="false" className="text-xs">
                Belum Mengerjakan
              </SelectItem>
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
            <Link
              key={index}
              to={`/tugas/${idTugas}/submisi/${row.original.id}`}
            >
              <li className="flex w-full items-center justify-between gap-2 rounded-lg border border-[#E2E5E8] px-3 py-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium">{row.original.nama}</p>
                  <p className="text-xs font-medium text-gray-500">
                    {row.original.nim}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <StatusTugasBadge selesai={row.original.selesai} />
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
  );
}
