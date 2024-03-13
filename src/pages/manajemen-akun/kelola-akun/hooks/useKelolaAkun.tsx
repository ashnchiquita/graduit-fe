import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import AccessCell from "../components/AccessCell";
import RowAction from "../components/RowAction";

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
    // const res = await axios.get(`/akun?search=${search}`);
    const res = {
      data: [
        {
          id: "6519412d-6c50-457c-9e44-1076b3dd617b",
          nama: "Chiquita Ahsanunnisa",
          email: "13521129@mahasiswa.itb.ac.id",
          roles: [],
        },
        {
          id: "acdb67a2-1fcd-42b9-b23b-af042b0727aa",
          nama: "Rava Maulan",
          email:
            "0.5867636326281975_0.12952183506811843_0.2849844693748018@gmail.com",
          roles: [],
        },
        {
          id: "7177be61-fb40-454b-bfc0-bd769be6bc4a",
          nama: "Rava Maulana",
          email: "a@gmail.com",
          roles: ["S2_MAHASISWA", "S2_PEMBIMBING"],
        },
      ],
    };
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
