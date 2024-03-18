import { DataTable } from "@/components/DataTable";
import useBatchUbahRole from "./hooks/useBatchUbahRole";
import useRoleDialog from "./hooks/useRoleDialog";
import RoleDialog from "./components/RoleDialog";

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
      <DataTable
        table={table}
        headline="Pengaturan Role Pengguna"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        // onClickCreate={onClickCreate}
      />

      <RoleDialog
        {...{ dialogOpen, setDialogOpen, table, ...roleDialogHookRet }}
      />
    </main>
  );
}
