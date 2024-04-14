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

  const handleCheckboxRoleAccess = (access: string[], checkAccess: string) => {
    return access.includes(checkAccess);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        nim: resAccount.nim,
        access: resAccount.roles,
      }),
    );

    return data;
  });

  const columns: ColumnDef<Account>[] = [
    {
      header: "Nama",
      accessorKey: "name",
      cell: ({ row }) => (
        <div>
          <div>{row.original.nim || row.original.email}</div>
          <div>{row.original.name}</div>
        </div>
      ),
    },

    // NOTE : how to decide if an account belongs to s1 or s2?, sementara di asumsiin kalo dikasi role itu lgsg ke s1 dan s2
    {
      header: "Dosen Pembimbing",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={
            handleCheckboxRoleAccess(row.getValue("access"), "S1_PEMBIMBING") ||
            handleCheckboxRoleAccess(row.getValue("access"), "S2_PEMBIMBING")
          }
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Penguji",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={
            handleCheckboxRoleAccess(row.getValue("access"), "S1_PENGUJI") ||
            handleCheckboxRoleAccess(row.getValue("access"), "S2_PENGUJI")
          }
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Kuliah",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={handleCheckboxRoleAccess(
            row.getValue("access"),
            "S2_KULIAH",
          )}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Tim Tugas",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={
            handleCheckboxRoleAccess(row.getValue("access"), "S1_TIM_TESIS") ||
            handleCheckboxRoleAccess(row.getValue("access"), "S2_TIM_TA")
          }
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Mahasiswa",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={
            handleCheckboxRoleAccess(row.getValue("access"), "S1_MAHASISWA") ||
            handleCheckboxRoleAccess(row.getValue("access"), "S2_MAHASISWA")
          }
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "TU",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={handleCheckboxRoleAccess(row.getValue("access"), "TU")}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Admin",
      accessorKey: "access",
      cell: ({ row }) => (
        <Checkbox
          checked={handleCheckboxRoleAccess(row.getValue("access"), "ADMIN")}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
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
    columnResizeMode: "onChange",
    data,
    manualPagination: true,
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
