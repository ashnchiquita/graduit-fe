import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Row,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllAccounts, putAccount } from "../../clients";
import {
  Account,
  GetAccountResponseItem,
  PutAccountRequestData,
} from "../../types";
import RowAction from "../components/RowAction";
import { RoleEnum } from "@/types/session-data";
import useSWRMutation from "swr/mutation";

export default function useKelolaAkun() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [namaValue, setNamaValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [roleValue, setRoleValue] = useState<RoleEnum[]>([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  const roleAccess = Object.keys(RoleEnum)
    .filter((v) => isNaN(Number(v)))
    .map((role, idx) => ({
      id: idx,
      name: role,
    }));

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

  const handleCheckboxChecked = async (row: Row<Account>, role: string) => {
    const { id, name, email, access, nim } = row.original;

    await trigger({
      id: id,
      nama: name,
      email: email,
      nim: nim,
      access: access.includes(role)
        ? access.filter((r) => r !== role)
        : [...access, role],
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
    const res = await getAllAccounts({
      search: searchValue === "" ? undefined : searchValue,
      nama: namaValue === "" ? undefined : namaValue,
      email: emailValue === "" ? undefined : emailValue,
      roles: roleValue.length === 0 ? undefined : roleValue,
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

    setRowCount(res.data.count);

    return data;
  });

  const { trigger } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  const columns: ColumnDef<Account>[] = [
    {
      header: "Nama",
      accessorKey: "name",
      // TODO : SORTING BERDASARKAN NAMA
      enableSorting: false,
      cell: ({ row }) => (
        <div>
          <div>{row.original.nim ?? row.original.email}</div>
          <div>{row.original.name}</div>
        </div>
      ),
      minSize: 400,
    },
    {
      header: "Dosen Pembimbing S1",
      accessorKey: "access_dosen_pembimbing_s1",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(
            row.original.access,
            "S1_PEMBIMBING",
          )}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S1_PEMBIMBING");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Pembimbing S2",
      accessorKey: "access_dosen_pembimbing_s2",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(
            row.original.access,
            "S2_PEMBIMBING",
          )}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S2_PEMBIMBING");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Penguji S1",
      accessorKey: "access_dosen_penguji_s1",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "S1_PENGUJI")}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S1_PENGUJI");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Dosen Penguji S2",
      accessorKey: "access_dosen_penguji_s2",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "S2_PENGUJI")}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S2_PENGUJI");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Tim TA",
      accessorKey: "access_tim_ta",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(row.original.access, "S1_TIM_TA")}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S1_TIM_TA");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Tim Tesis",
      accessorKey: "access_tim_tesis",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(
            row.original.access,
            "S2_TIM_TESIS",
          )}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S2_TIM_TESIS");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Mahasiswa S1",
      accessorKey: "access_mahasiswa_s1",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(
            row.original.access,
            "S1_MAHASISWA",
          )}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S1_MAHASISWA");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      header: "Mahasiswa S2",
      accessorKey: "access_mahasiswa_s2",
      cell: ({ row }) => (
        <Checkbox
          className="data-[state=checked]:bg-sky-800"
          checked={handleCheckboxRoleAccess(
            row.original.access,
            "S2_MAHASISWA",
          )}
          onCheckedChange={() => {
            handleCheckboxChecked(row, "S2_MAHASISWA");
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
          onCheckedChange={() => {
            handleCheckboxChecked(row, "ADMIN");
          }}
        />
      ),
      enableSorting: false,
    },
    {
      id: "action",
      cell: ({ row }) => <RowAction row={row} refetchAccounts={fetchData} />,
      enableSorting: false,
      size: 0,
    },
  ];

  const table = useReactTable({
    columns,
    columnResizeMode: "onChange",
    data,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    rowCount: rowCount,
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

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    openFilterDialog,
    setOpenFilterDialog,
    namaValue,
    setNamaValue,
    emailValue,
    setEmailValue,
    roleValue,
    setRoleValue,
    handleRoleValueChange,
    roleAccess,
  };
}
