import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectData from "@/types/select-data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { MahasiswaKelas } from "../types";

type InputNilaiMobileTableProps = {
  table: Table<MahasiswaKelas>;
  handleClickBulkUbahNilai: () => void;
  searchValue: string;
  searchPlaceholder: string;
  setSearchValue: (value: string) => void;
  selectFilterValue: string;
  selectFilterOptions: SelectData[];
  setSelectFilterValue: (value: string) => void;
  handleClickSingleUbahNilai: (row: MahasiswaKelas) => void;
};

export default function InputNilaiMobileTable({
  table,
  handleClickBulkUbahNilai,
  selectFilterValue,
  selectFilterOptions = [],
  setSelectFilterValue,
  searchValue,
  setSearchValue,
  searchPlaceholder,
  handleClickSingleUbahNilai,
}: InputNilaiMobileTableProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-lg bg-white px-5 py-6 md:hidden">
      <div className="flex flex-col gap-2">
        <div className="group flex flex-1 items-center gap-2 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:flex-none">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            className="flex-1 outline-none md:w-[225px] md:flex-auto"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={selectFilterValue}
            onValueChange={setSelectFilterValue}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {Object.values(selectFilterOptions).map(({ label, value }) => (
                <SelectItem key={value} value={value} className="text-xs">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            className="flex-1 bg-blue-500 text-xs text-gray-100 active:bg-blue-700"
            type="submit"
            onClick={() => handleClickBulkUbahNilai()}
          >
            Ubah Nilai
          </Button>
        </div>
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
                    {row.original.namaMahasiswa}
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
                  handleClickSingleUbahNilai(row.original);
                }}
              >
                Ubah Nilai
              </Button>
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-xs text-slate-500">
                {row.original.mataKuliah} - {row.original.kelas}
              </p>
              <Badge
                variant="secondary"
                className="rounded-md text-sm font-bold text-primary"
              >
                {row.original.nilai ?? "-"}
              </Badge>
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
  );
}
