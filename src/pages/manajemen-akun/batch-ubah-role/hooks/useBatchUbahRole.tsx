import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Account } from "../types";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { getAllAccounts } from "../../clients";
import { GetAccountResponseItem } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useBatchUbahRole() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [access, setAccess] = useState<
    {
      name: string;
      id: number;
    }[]
  >([]);

  const { data = [], mutate: fetchData } = useSWR("/akun", async () => {
    const res = await getAllAccounts({
      search: searchValue === "" ? undefined : searchValue,
      page: 1,
      limit: 5,
    });
    const data: Account[] = res.data.map(
      (resAccount: GetAccountResponseItem) => ({
        id: resAccount.id,
        email: resAccount.email,
        name: resAccount.nama,
        access: resAccount.roles,
      }),
    );

    return data;
  });

  const handleSearchValueChange = (value: string) => {
    setSearchParams(value ? { search: value } : {});
    setSearchValue(value);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

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
              !row.getIsSelected() && row.toggleSelected();

              setDialogOpen(true);
              console.log(table.getSelectedRowModel());
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

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const formSchema = z.object({
    access: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .array(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access: [],
    },
  });

  const [isSubmitDisabled, setSubmitDisabled] = useState(
    form.getValues().access.length === 0,
  );

  const handleSubmit = async ({ access }: z.infer<typeof formSchema>) => {
    // await trigger({
    //   nama: values.name,
    //   email: values.email,
    //   access: values.access.map((item) => item.name),
    // });

    // if (error) {
    //   // TODO: Add toast
    //   console.error(error);
    // } else {
    //   navigate("/manajemen/kelola-akun");
    // }
    console.log(
      "val",
      access.map((a) => a.name),
    );
    console.log(
      "id",
      table.getSelectedRowModel().rows.map((r) => r.original.id),
    );
  };

  return {
    table,
    searchValue,
    handleSearchValueChange,
    fetchData,
    dialogOpen,
    setDialogOpen,
    access,
    setAccess,
    form,
    handleSubmit,
    isSubmitDisabled,
    setSubmitDisabled,
  };
}
