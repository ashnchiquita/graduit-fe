import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import axios from "@/config/axios-config";
import RowAction from "../components/RowAction";
import AccessCell from "../components/AccessCell";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

export type Account = {
  id: string;
  email: string;
  name: string;
  access: string[];
};

interface ReturnType {
  table: Table<Account>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  fetchAccounts: (search: string) => Promise<void>;
}

export default function useKelolaAkun(): ReturnType {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<Account[]>([]);

  const fetchAccounts = async (search: string) => {
    const res = await axios.get(`/akun?search=${search}`);
    setData(
      res.data.map(
        (resAccount: any): Account => ({
          id: resAccount.id,
          email: resAccount.email,
          name: resAccount.nama,
          access: resAccount.roles,
        }),
      ),
    );
  };

  useEffect(() => {
    fetchAccounts(searchParams.get("search") || "");
  }, [searchParams]);

  const columns: ColumnDef<Account>[] = [
    {
      id: "select",
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
    },
    {
      id: "action",
      cell: ({ row }) => (
        <RowAction row={row} refetchAccounts={fetchAccounts} />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, searchParams, setSearchParams, fetchAccounts };
}
