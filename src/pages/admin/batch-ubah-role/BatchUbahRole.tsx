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
import { IoFilterOutline } from "react-icons/io5";
import RoleDialog from "./components/RoleDialog";
import useBatchUbahRole from "./hooks/useBatchUbahRole";
import useRoleDialog from "./hooks/useRoleDialog";

export default function BatchUbahRole(): JSX.Element {
  const {
    table,
    searchValue,
    handleSearchValueChange,
    dialogOpen,
    setDialogOpen,
    fetchData,
  } = useBatchUbahRole();

  const roleDialogHookRet = useRoleDialog({ table, fetchData, setDialogOpen });

  return (
    <main className="flex w-full flex-col gap-5 px-4 pb-10">
      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Pengaturan Role Pengguna"
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
        />
      </section>

      <section className="flex w-full flex-col gap-4 rounded-lg bg-white px-5 py-6 md:hidden">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex flex-auto items-center gap-2 border-blue-500 text-blue-500 hover:bg-muted hover:text-blue-500"
          >
            <IoFilterOutline />
            <p>Filter</p>
          </Button>

          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            className="flex-auto bg-blue-500 text-gray-100 hover:bg-blue-600"
            type="submit"
            onClick={() => setDialogOpen(true)}
          >
            Ubah Role
          </Button>
        </div>

        {table.getRowModel().rows.map((row, index) => (
          <Card key={index} className="w-full">
            <CardContent className="flex flex-col gap-2 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={() => row.toggleSelected()}
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

                    setDialogOpen(true);
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

      <RoleDialog
        {...{ dialogOpen, setDialogOpen, table, ...roleDialogHookRet }}
      />
    </main>
  );
}
