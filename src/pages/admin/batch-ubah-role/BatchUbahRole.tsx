import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import useBatchUbahRole from "./hooks/useBatchUbahRole";
import useRoleDialog from "./hooks/useTambahRoleDialog";
import FilterPopup from "../components/FilterPopup";
import { VscListFilter } from "react-icons/vsc";
import TambahRoleDialog from "./components/TambahRoleDialog";
import HapusRoleDialog from "./components/HapusRoleDialog";
import useHapusRoleDialog from "./hooks/useHapusRoleDialog";
import { Search } from "lucide-react";

export default function BatchUbahRole(): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    tambahRoleDialogOpen,
    setTambahRoleDialogOpen,
    hapusRoleDialogOpen,
    setHapusRoleDialogOpen,
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
    handleAddAccountButton,
  } = useBatchUbahRole();

  const roleDialogHookRet = useRoleDialog({
    table,
    fetchData,
    setTambahRoleDialogOpen,
  });

  const hapusRoleDialogHookRet = useHapusRoleDialog({
    table,
    fetchData,
    setHapusRoleDialogOpen,
  });

  return (
    <main className="flex w-full flex-col gap-5 px-4 pb-10">
      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Pengaturan Akun Aplikasi Pengguna"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari nama atau email"
          customElementsRight={
            <>
              <Button
                onClick={() => setOpenFilterDialog(true)}
                variant={"ghost"}
                className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
              >
                <VscListFilter size={14} />
                Filter
              </Button>
              <Button
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={() => setTambahRoleDialogOpen(true)}
                className="h-fit bg-blue-600 px-3 py-1 text-white transition-all"
              >
                Ubah Role
              </Button>
              <Button
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={() => setHapusRoleDialogOpen(true)}
                className="h-fit bg-red-500 px-3 py-1 text-white transition-all"
              >
                Hapus Role
              </Button>
              <Button
                onClick={() => handleAddAccountButton()}
                className="h-fit bg-teal-600 px-3 py-1 text-white"
              >
                Tambah Akun
              </Button>
            </>
          }
        />
      </section>

      {/* MOBILE */}

      <section className="flex w-full flex-col gap-4 rounded-lg bg-white px-5 py-6 md:hidden">
        <div className="flex gap-4">
          <div className="group flex flex-1 items-center gap-2 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:flex-none">
            <Search size={14} className="text-muted-foreground" />
            <input
              type="text"
              className="flex-1 outline-none md:w-[225px] md:flex-auto"
              placeholder="Cari nama atau email..."
              value={searchValue}
              onChange={(e) => {
                handleSearchValueChange(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={() => setOpenFilterDialog(true)}
            variant={"ghost"}
            className="flex flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
          >
            <VscListFilter size={14} />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value: boolean) =>
                table.toggleAllPageRowsSelected(value)
              }
              className="size-[20px] border-blue-600 data-[state=checked]:bg-blue-600"
            />
            <p className="text-muted-foreground">Select All</p>
          </div>
          <div className="flex gap-4">
            <Button
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={() => setTambahRoleDialogOpen(true)}
              className=" bg-blue-600 px-3 py-1 text-white transition-all"
            >
              Ubah Role
            </Button>
            <Button
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={() => setHapusRoleDialogOpen(true)}
              className=" bg-red-500 px-3 py-1 text-white transition-all"
            >
              Hapus Role
            </Button>
          </div>
        </div>

        {table.getRowModel().rows.map((row, index) => (
          <Card key={index} className="w-full">
            <CardContent className="flex flex-col gap-2 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={() => row.toggleSelected()}
                    className="border-muted-foreground data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      {row.original.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.original.email}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="size-fit border-blue-500 px-3 py-2 text-xs text-blue-500 hover:bg-muted hover:text-blue-500"
                  onClick={() => {
                    table.setRowSelection((_) => {
                      return {
                        [row.id]: true,
                      };
                    });

                    setTambahRoleDialogOpen(true);
                  }}
                >
                  Ubah Role
                </Button>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500">Role Pengguna</p>

                <ul className="flex w-full flex-wrap gap-2">
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
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(0);
                table.resetRowSelection();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                table.previousPage();
                table.resetRowSelection();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => {
                table.nextPage();
                table.resetRowSelection();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                table.resetRowSelection();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* DIALOG(S) */}
      <TambahRoleDialog
        {...{
          tambahRoleDialogOpen,
          setTambahRoleDialogOpen,
          table,
          ...roleDialogHookRet,
        }}
      />
      <HapusRoleDialog
        {...{
          hapusRoleDialogOpen,
          setHapusRoleDialogOpen,
          table,
          ...hapusRoleDialogHookRet,
        }}
      />
      <FilterPopup
        {...{
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
        }}
      />
    </main>
  );
}
