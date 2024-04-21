import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  Row,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { getAllAccounts, putAccount } from "../../clients";
import {
  Account,
  GetAccountResponseItem,
  PutAccountRequestData,
} from "../../types";
import AccessCell from "../components/AccessCell";
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

  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("/manajemen/tambah-akun");
  };

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
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

    return data;
  });

  const { trigger, error } = useSWRMutation(
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
            handleCheckboxChecked(row, "S1_PEMBIMBING");
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
            handleCheckboxChecked(row, "S1_PENGUJI");
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
            handleCheckboxChecked(row, "S2_KULIAH");
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
            handleCheckboxChecked(row, "S1_TIM_TESIS");
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
            handleCheckboxChecked(row, "S1_MAHASISWA");
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
            handleCheckboxChecked(row, "TU");
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
            handleCheckboxChecked(row, "ADMIN");
            row.toggleSelected(value);
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
  });

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    // onClickCreate,
    openFilterDialog,
    setOpenFilterDialog,
    namaValue,
    setNamaValue,
    emailValue,
    setEmailValue,
    roleValue,
    setRoleValue,
    handleRoleValueChange,
  };
}
