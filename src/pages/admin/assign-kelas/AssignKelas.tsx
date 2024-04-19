import { DataTable } from "@/components/DataTable";
import useAssignKelas from "./hooks/useAssignKelas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoFilterOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PageProps = {
  type: "DOSEN" | "MAHASISWA";
};

export default function AssignKelas({ type }: PageProps): JSX.Element {
  const { table, searchValue, handleSearchValueChange } = useAssignKelas(type);

  return (
    <main className="flex w-full flex-col gap-5 px-4 pb-10">
      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Pengaturan Role Pengguna"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari nama atau email"
        />
      </section>

      <section className="flex w-full flex-col gap-4 rounded-lg bg-white px-5 py-6 md:hidden">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex flex-auto items-center gap-2 border-blue-500 text-blue-500 hover:bg-muted hover:text-blue-500"
          >
            <IoFilterOutline />
            <p>Filter</p>
          </Button>

          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            className="flex-auto bg-blue-500 text-gray-100 hover:bg-blue-600"
            type="submit"
          >
            Ubah Role
          </Button>
        </div>

        {table.getRowModel().rows.map((row, index) => (
          <Card key={index} className="w-full">
            <CardContent className="flex flex-col gap-2 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={() => row.toggleSelected()}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      {row.original.nama}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.original.email}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="size-fit border-blue-500 px-3 py-2 text-xs text-blue-500 hover:bg-muted hover:text-blue-500"
                  onClick={() => {
                    table.setRowSelection((_) => {
                      return {
                        [row.id]: true,
                      };
                    });
                  }}
                >
                  Ubah Role
                </Button>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500">Role Pengguna</p>

                <ul className="flex w-full flex-wrap gap-2">
                  {row.original.kelas.map((kelas, index) => (
                    <li key={index} className="shrink-0">
                      <Badge
                        variant="secondary"
                        className="rounded-md text-xs font-medium text-primary"
                      >
                        {kelas.nomor}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
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
