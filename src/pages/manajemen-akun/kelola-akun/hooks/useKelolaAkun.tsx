import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllAccounts } from "../../clients";
import { Account, GetAccountResponseItem } from "../../types";
import AccessCell from "../components/AccessCell";
import RowAction from "../components/RowAction";

export default function useKelolaAkun() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("/manajemen/tambah-akun");
  };

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

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

    return data;
  });

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
      header: "Akses Aplikasi",
      accessorKey: "access",
      cell: ({ row }) => <AccessCell row={row} />,
      enableSorting: false,
    },
    {
      id: "action",
      cell: ({ row }) => <RowAction row={row} refetchAccounts={fetchData} />,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    onClickCreate,
  };
}
