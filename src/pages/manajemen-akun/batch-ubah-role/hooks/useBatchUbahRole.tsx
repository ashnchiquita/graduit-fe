import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Account, BatchUbahRoleHookRet } from "../types";
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { getAllAccounts } from "../../clients";
import { GetAccountResponseItem } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function useBatchUbahRole(): BatchUbahRoleHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearchValueChange = (value: string) => {
    setSearchParams(
      value
        ? {
            search: value,
            page: (tablePagination.pageIndex + 1).toString(),
            limit: tablePagination.pageSize.toString(),
          }
        : {
            page: (tablePagination.pageIndex + 1).toString(),
            limit: tablePagination.pageSize.toString(),
          },
    );
    setSearchValue(value);
    fetchData();
  };

  const columns: ColumnDef<Account>[] = [
    {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="bg-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Nama",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "access",
      cell: ({ row }) => (
        <ul className="flex max-w-[300px] flex-wrap gap-2">
          {row.original.access.map((access, index) => (
            <li key={index} className="shrink-0">
              <Badge
                variant="secondary"
                className="rounded-md text-xs font-medium text-primary"
              >
                {access}
              </Badge>
            </li>
          ))}
        </ul>
      ),
      enableSorting: false,
    },
    {
      id: "action",
      cell: ({ row }) => (
        <div className="flex w-full justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              table.setRowSelection((_) => {
                return {
                  [row.id]: true,
                };
              });

              setDialogOpen(true);
            }}
            className="size-fit px-3 py-2 text-xs text-blue-500 hover:bg-muted hover:text-blue-500"
          >
            Ubah Role
          </Button>
        </div>
      ),
      header: () => <p className="w-full text-center">Aksi</p>,
      enableSorting: false,
    },
  ];

  let table: Table<Account>;
  const [rowCount, setRowCount] = useState(0);
  const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
    const res = await getAllAccounts({
      search: searchValue === "" ? undefined : searchValue,
      page: table.getState().pagination.pageIndex + 1,
      limit: table.getState().pagination.pageSize,
    });

    const data: Account[] = res.data.akun.map(
      (resAccount: GetAccountResponseItem) => ({
        id: resAccount.id,
        email: resAccount.email,
        name: resAccount.nama,
        access: resAccount.roles,
      }),
    );

    setRowCount(res.data.count);

    return data;
  });

  table = useReactTable({
    columns,
    data,
    manualPagination: true,
    rowCount: rowCount,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageIndex: +(searchParams?.get("page") ?? 1) - 1,
        pageSize: +(searchParams?.get("limit") ?? 10),
      },
    },
  });

  const tablePagination = table.getState().pagination;
  useEffect(
    () => {
      fetchData();
      setSearchParams(
        searchValue
          ? {
              search: searchValue,
              page: (tablePagination.pageIndex + 1).toString(),
              limit: tablePagination.pageSize.toString(),
            }
          : {
              page: (tablePagination.pageIndex + 1).toString(),
              limit: tablePagination.pageSize.toString(),
            },
      );
    },
    // eslint-disable-next-line
    [tablePagination],
  );

  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line
    [searchValue],
  );

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    dialogOpen,
    setDialogOpen,
  };
}
