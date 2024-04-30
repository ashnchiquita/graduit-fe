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
import { cn } from "@/lib/utils";
import SelectData from "@/types/select-data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { flexRender } from "@tanstack/react-table";

import type { Table as TableType } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  headline?: string;
  description?: string;
  searchValue?: string;
  searchPlaceholder?: string;
  setSearchValue?: (value: string) => void;
  customElementsLeft?: JSX.Element;
  customElementsRight?: JSX.Element;
  allowHorizontalOverflow?: boolean;
  selectFilterValue?: string;
  selectFilterPlaceholder?: string;
  selectFilterOptions?: SelectData[];
  setSelectFilterValue?: (value: string) => void;
  strataFilterValue?: string;
  setStrataFilterValue?: (value: string) => void;
}

export function DataTable<TData>({
  table,
  headline,
  description,
  searchValue,
  searchPlaceholder,
  setSearchValue,
  customElementsLeft,
  customElementsRight,
  allowHorizontalOverflow = false,
  selectFilterOptions,
  selectFilterPlaceholder,
  selectFilterValue,
  setSelectFilterValue,
  strataFilterValue,
  setStrataFilterValue,
}: DataTableProps<TData>) {
  const useTableConfig =
    !!headline ||
    !!description ||
    !!searchValue ||
    !!searchPlaceholder ||
    !!setSearchValue ||
    !!customElementsLeft ||
    !!customElementsRight ||
    !!selectFilterOptions ||
    !!selectFilterValue ||
    !!setSelectFilterValue ||
    !!strataFilterValue ||
    !!setStrataFilterValue;

  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo]);

  const containerRef = useRef<HTMLTableElement>(null);

  const [fullWidth, setFullWidth] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setFullWidth(containerRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  const strataOption = [
    {
      label: "S1",
      value: "S1",
    },
    {
      label: "S2",
      value: "S2",
    },
  ];

  // TODO loading state
  return (
    <div>
      <div className="mb-3 rounded-md border bg-white" ref={containerRef}>
        {useTableConfig && (
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-4 px-6 py-5">
            <div className="flex items-center gap-3">
              <div>
                {headline && (
                  <div className="text-lg font-semibold">{headline}</div>
                )}
                {description && (
                  <div className="text-sm text-muted-foreground">
                    {description}
                  </div>
                )}
              </div>
              {strataFilterValue !== undefined && !!setStrataFilterValue && (
                <Select
                  value={strataFilterValue}
                  onValueChange={setStrataFilterValue}
                >
                  <SelectTrigger className="h-8 w-[65px] border bg-slate-100 text-xs">
                    <SelectValue placeholder="" />
                  </SelectTrigger>

                  <SelectContent className="min-w-0">
                    {Object.values(strataOption).map(({ label, value }) => (
                      <SelectItem key={value} value={value} className="text-xs">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {customElementsLeft}
              {searchValue !== undefined && !!setSearchValue && (
                <div className="group flex flex-1 items-center gap-2 rounded-md border border-input bg-transparent p-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:flex-none">
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
              )}
              {selectFilterOptions !== undefined &&
                selectFilterValue !== undefined &&
                !!setSelectFilterValue && (
                  <Select
                    value={selectFilterValue}
                    onValueChange={setSelectFilterValue}
                  >
                    <SelectTrigger className="w-[200px] text-xs">
                      <SelectValue placeholder={selectFilterPlaceholder} />
                    </SelectTrigger>

                    <SelectContent>
                      {Object.values(selectFilterOptions).map(
                        ({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="text-xs"
                          >
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                )}
              {customElementsRight}
            </div>
          </div>
        )}

        <Table
          style={{
            ...columnSizeVars,
            width: allowHorizontalOverflow
              ? Math.max(fullWidth, table.getTotalSize()) - 2
              : undefined,
          }}
          className="text-xs md:text-sm"
        >
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
                      className="relative cursor-pointer"
                      style={{
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      }}
                    >
                      <div
                        style={{
                          justifyContent:
                            (header.column.columnDef.meta as any)
                              ?.alignHeader === "center"
                              ? "center"
                              : (header.column.columnDef.meta as any)
                                    ?.alignHeader === "right"
                                ? "flex-end"
                                : "flex-start",
                        }}
                        className="flex w-full items-center gap-4"
                      >
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
                        {header.column.getCanResize() && (
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={cn(
                              "absolute top-0 right-0 h-full w-4 group-hover:bg-black/10 cursor-col-resize select-none touch-none",
                            )}
                          />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemoizedDataTableBody table={table} />
          ) : (
            <DataTableBody table={table} />
          )}
        </Table>
        <div className="flex min-h-12 items-center justify-between space-x-6 border-t px-4 py-1 text-gray-500 lg:space-x-8">
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
      </div>
    </div>
  );
}

const MemoizedDataTableBody = React.memo(
  DataTableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof DataTableBody;

function DataTableBody<TData>({ table }: { table: TableType<TData> }) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                align={(cell.column.columnDef.meta as any)?.align ?? "left"}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
}
