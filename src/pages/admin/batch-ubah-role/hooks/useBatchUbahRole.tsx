import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Row,
  Table,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllAccounts, putAccount } from "../../clients";
import {
  GetAccountResponseItem,
  PutAccountRequestData,
  RoleAccess,
} from "../../types";
import { Account, BatchUbahRoleHookRet } from "../types";
import { RoleEnum } from "@/types/session-data";
import useSWRMutation from "swr/mutation";
import { RoleAccessViewDosen, RoleAccessViewMahasiswa } from "../const";

export default function useBatchUbahRole(): BatchUbahRoleHookRet {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const viewRole = searchParams.get("view") ?? "";
  const [namaValue, setNamaValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [roleValue, setRoleValue] = useState<RoleEnum[]>([]);
  const [roleAccess, setRoleAccess] = useState<RoleAccess[]>([]);
  const [columns, setColumns] = useState<ColumnDef<Account>[]>([]);

  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [tambahRoleDialogOpen, setTambahRoleDialogOpen] = useState(false);
  const [hapusRoleDialogOpen, setHapusRoleDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearchValueChange = (value: string) => {
    setSearchParams(
      value
        ? {
            search: value,
            view: viewRole,
            page: (tablePagination.pageIndex + 1).toString(),
            limit: tablePagination.pageSize.toString(),
          }
        : {
            view: viewRole,
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

  const { trigger } = useSWRMutation(
    "/akun",
    async (_, { arg }: { arg: PutAccountRequestData }) => {
      const res = await putAccount(arg);
      return res.data;
    },
  );

  useEffect(() => {
    let tempRoleAccess: RoleAccess[] = [];
    if (viewRole === "mahasiswa") {
      tempRoleAccess = Object.keys(RoleEnum)
        .filter((v) => isNaN(Number(v)) && RoleAccessViewMahasiswa.includes(v))
        .map((role, idx) => ({
          id: idx,
          name: role,
        }));
      setColumns(MahasiswaViewColumns);
    } else if (viewRole === "dosen") {
      tempRoleAccess = Object.keys(RoleEnum)
        .filter((v) => isNaN(Number(v)) && RoleAccessViewDosen.includes(v))
        .map((role, idx) => ({
          id: idx,
          name: role,
        }));
      setColumns(DosenViewColumns);
    } else {
      tempRoleAccess = Object.keys(RoleEnum)
        .filter((v) => isNaN(Number(v)))
        .map((role, idx) => ({
          id: idx,
          name: role,
        }));
      setColumns(DefaultColumns);
    }
    setRoleAccess(tempRoleAccess);
  }, [viewRole]);

  // TODO: Find a better way to populate the columns
  const DefaultColumns: ColumnDef<Account>[] = [
    {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="data-[state=checked]:bg-blue-600"
        />
      ),
      size: 0,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          className="data-[state=checked]:bg-sky-800"
        />
      ),
    },
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
  ];

  const MahasiswaViewColumns: ColumnDef<Account>[] = [
    {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="data-[state=checked]:bg-blue-600"
        />
      ),
      size: 0,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          className="data-[state=checked]:bg-sky-800"
        />
      ),
    },
    {
      header: "Nama",
      accessorKey: "name",
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
  ];

  const DosenViewColumns: ColumnDef<Account>[] = [
    {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          className="data-[state=checked]:bg-blue-600"
        />
      ),
      size: 0,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          className="data-[state=checked]:bg-sky-800"
        />
      ),
    },
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
      size: 0,
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
  ];

  let table: Table<Account>;
  const [rowCount, setRowCount] = useState(0);
  const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
    let roles = roleValue.length === 0 ? undefined : roleValue;
    if (viewRole === "mahasiswa") {
      roles = roles
        ? roles.concat(RoleAccessViewMahasiswa as unknown as RoleEnum[])
        : (RoleAccessViewMahasiswa as unknown as RoleEnum[]);
    } else if (viewRole === "dosen") {
      roles = roles
        ? roles.concat(RoleAccessViewDosen as unknown as RoleEnum[])
        : (RoleAccessViewDosen as unknown as RoleEnum[]);
    }
    const res = await getAllAccounts({
      search: searchValue === "" ? undefined : searchValue,
      page: table.getState().pagination.pageIndex + 1,
      nama: namaValue === "" ? undefined : namaValue,
      email: emailValue === "" ? undefined : emailValue,
      roles: roles,
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
              view: viewRole,
              page: (tablePagination.pageIndex + 1).toString(),
              limit: tablePagination.pageSize.toString(),
            }
          : {
              view: viewRole,
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
    roleAccess,
    setRoleValue,
    handleRoleValueChange,
    handleAddAccountButton,
  };
}
