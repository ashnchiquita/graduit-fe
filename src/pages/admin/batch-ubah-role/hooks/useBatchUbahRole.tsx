import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllAccounts } from "../../clients";
import { GetAccountResponseItem } from "../../types";
import { Account, BatchUbahRoleHookRet } from "../types";
import { RoleEnum } from "@/types/session-data";

export default function useBatchUbahRole(): BatchUbahRoleHookRet {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [namaValue, setNamaValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [roleValue, setRoleValue] = useState<RoleEnum[]>([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [tambahRoleDialogOpen, setTambahRoleDialogOpen] = useState(false);
  const [hapusRoleDialogOpen, setHapusRoleDialogOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleRoleValueChange = (val: RoleEnum) => {
    if (roleValue.includes(val)) {
      setRoleValue((prevRoleValue) =>
        prevRoleValue.filter((role) => role !== val),
      );
    } else {
      setRoleValue((prevRoleValue) => [...prevRoleValue, val]);
    }
  };

  const handleCheckboxRoleAccess = (access: string[], checkAccess: string) => {
    return access.includes(checkAccess);
  };

  const handleAddAccountButton = () => {
    navigate("/manajemen/tambah-akun");
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
      size: 0,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        />
      ),
    },
    {
      header: "Nama",
      accessorKey: "name",
      cell: ({ row }) => (
        <div>
          <div>{row.original.nim ?? row.original.email}</div>
          <div>{row.original.name}</div>
        </div>
      ),
    },

    // NOTE : how to decide if an account belongs to s1 or s2?, sementara di asumsiin kalo dikasi role itu lgsg ke s1 dan s2
    {
      header: "Dosen Pembimbing",
      accessorKey: "access_dosen_pembimbing",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={
            handleCheckboxRoleAccess(row.original.access, "S1_PEMBIMBING") ||
            handleCheckboxRoleAccess(row.original.access, "S2_PEMBIMBING")
          }
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "S1_PEMBIMBING");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Penguji",
      accessorKey: "access_dosen_penguji",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={
            handleCheckboxRoleAccess(row.original.access, "S1_PENGUJI") ||
            handleCheckboxRoleAccess(row.original.access, "S2_PENGUJI")
          }
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "S1_PENGUJI");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Kuliah",
      accessorKey: "access_dosen_kuliah",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "S2_KULIAH")}
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "S2_KULIAH");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Tim Tugas",
      accessorKey: "access_tim_tugas",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={
            handleCheckboxRoleAccess(row.original.access, "S1_TIM_TESIS") ||
            handleCheckboxRoleAccess(row.original.access, "S2_TIM_TA")
          }
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "S1_TIM_TESIS");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Mahasiswa",
      accessorKey: "access_mahasiswa",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={
            handleCheckboxRoleAccess(row.original.access, "S1_MAHASISWA") ||
            handleCheckboxRoleAccess(row.original.access, "S2_MAHASISWA")
          }
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "S1_MAHASISWA");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "TU",
      accessorKey: "access_tu",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "TU")}
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "TU");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Admin",
      accessorKey: "access_admin",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "ADMIN")}
          onCheckedChange={(value: boolean) => {
            // handleCheckboxChecked(row, "ADMIN");
            row.toggleSelected(value);
          }}
        />
      ),
      enableSorting: false,
    },
  ];

  let table: Table<Account>;
  const [rowCount, setRowCount] = useState(0);
  const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
    const res = await getAllAccounts({
      search: searchValue === "" ? undefined : searchValue,
      page: table.getState().pagination.pageIndex + 1,
      nama: namaValue === "" ? undefined : namaValue,
      email: emailValue === "" ? undefined : emailValue,
      roles: roleValue.length === 0 ? undefined : roleValue,
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

    setRowCount(res.data.count);

    return data;
  });

  table = useReactTable({
    columns,
    data,
    manualPagination: true,
    rowCount: rowCount,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
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
    tambahRoleDialogOpen,
    setTambahRoleDialogOpen,
    hapusRoleDialogOpen,
    setHapusRoleDialogOpen,
    openFilterDialog,
    setOpenFilterDialog,
    namaValue,
    setNamaValue,
    emailValue,
    setEmailValue,
    roleValue,
    setRoleValue,
    handleRoleValueChange,
    handleAddAccountButton,
  };
}
