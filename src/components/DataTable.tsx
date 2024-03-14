"use client";

//esling-disable-next-line
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { flexRender } from "@tanstack/react-table";

import type { Table as TableType } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ListFilter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  headline?: string;
  description?: string;
  searchValue?: string;
  searchPlaceholder?: string;
  setSearchValue?: (value: string) => void;
  onClickDelete?: () => void;
  onClickFilter?: () => void;
  onClickCreate?: () => void;
}

export function DataTable<TData>({
  table,
  headline,
  description,
  searchValue,
  searchPlaceholder,
  setSearchValue,
  onClickCreate,
  onClickDelete,
  onClickFilter,
}: DataTableProps<TData>) {
  const useTableConfig =
    !!headline ||
    !!description ||
    !!searchValue ||
    !!searchPlaceholder ||
    !!setSearchValue ||
    !!onClickCreate ||
    !!onClickDelete ||
    !!onClickFilter;

  // TODO resize
  // TODO loading state
  return (
    <div>
      <div className="rounded-md border bg-white">
        {useTableConfig && (
          <div className="flex px-6 py-5">
            <div className="flex-1">
              {headline && (
                <div className="text-lg font-semibold">{headline}</div>
              )}
              {description && (
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {searchValue !== undefined && !!setSearchValue && (
                <div className="group flex w-[235px] items-center gap-2 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <Search size={14} className="text-muted-foreground" />
                  <input
                    type="text"
                    className="outline-none"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </div>
              )}
              {!!onClickDelete && (
                <Button
                  onClick={() => {
                    onClickDelete();
                  }}
                  variant="outline"
                  className="flex h-fit gap-2 bg-transparent px-2 py-1"
                >
                  <Trash2 size={14} />
                  <div>Delete</div>
                </Button>
              )}
              {!!onClickFilter && (
                <Button
                  onClick={() => {
                    onClickFilter();
                  }}
                  variant="outline"
                  className="flex h-fit gap-2 bg-transparent px-2 py-1"
                >
                  <ListFilter size={14} />
                  <div>Filter</div>
                </Button>
              )}
              {!!onClickCreate && (
                <Button
                  onClick={() => {
                    onClickCreate();
                  }}
                  className="flex h-fit gap-2 border border-blue-500 bg-blue-500 px-2 py-1 hover:border-blue-600 hover:bg-blue-600"
                >
                  <Plus size={14} />
                  <div>Create</div>
                </Button>
              )}
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="select-none border-t bg-muted/50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={() => {
                        if (header.column.getCanSort())
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc",
                          );
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {!header.column.getCanSort() ||
                        header.isPlaceholder ? null : header.column.getIsSorted() ===
                          false ? (
                          <ChevronsUpDown size={16} />
                        ) : header.column.getIsSorted() === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex h-12 items-center justify-between space-x-6 border-t px-4 text-gray-500 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
