import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertDialog from "./components/UpsertDialog";
import useDaftarTopik from "./hooks/useDaftarTopik";
import { RoleEnum } from "@/types/session-data";
import { isAdmin, isDosen } from "@/lib/checkRole";

function enableDropdown(roles?: RoleEnum[]) {
  return (
    isAdmin(roles) ||
    (roles?.includes(RoleEnum.S1_PEMBIMBING) &&
      roles?.includes(RoleEnum.S2_PEMBIMBING))
  );
}

export default function DaftarTopik() {
  const {
    table,
    searchValue,
    isInsertDialogOpen,
    setIsInsertDialogOpen,
    handleChangeSearchValue,
    updateData,
    handleClickGenerateTemplate,
    handleClickImportFromTemplate,
    roles,
    strataFilter,
    setStrataFilter,
  } = useDaftarTopik();

  return (
    <div className="px-4">
      <DataTable
        table={table}
        headline="Daftar Topik"
        description="Topik yang diajukan oleh pembimbing"
        searchValue={searchValue}
        setSearchValue={handleChangeSearchValue}
        searchPlaceholder="Cari topik atau dosen pengaju"
        strataFilterValue={enableDropdown(roles) ? strataFilter : undefined}
        setStrataFilterValue={
          enableDropdown(roles)
            ? (val: string) => setStrataFilter(val as "S1" | "S2")
            : undefined
        }
        allowHorizontalOverflow
        customElementsRight={
          <div className="flex items-center gap-1">
            {isAdmin(roles) && (
              <>
                <Button
                  size="sm"
                  className="hidden gap-2 border-blue-500 text-xs text-blue-500 hover:text-blue-500 md:flex"
                  onClick={handleClickGenerateTemplate}
                  variant="outline"
                >
                  {/* <Sheet size={16} /> */}
                  <div>Template</div>
                </Button>

                <Button
                  size="sm"
                  className="hidden gap-2 bg-blue-500 text-xs hover:bg-blue-600 active:bg-blue-700 md:flex"
                  onClick={handleClickImportFromTemplate}
                >
                  {/* <Upload size={16} /> */}
                  <div>Import Template</div>
                </Button>
              </>
            )}

            {(isDosen(roles) || isAdmin(roles)) && (
              <Dialog
                open={isInsertDialogOpen}
                onOpenChange={setIsInsertDialogOpen}
              >
                <DialogTrigger>
                  <Button
                    size="sm"
                    className="flex gap-2 bg-blue-500 text-xs hover:bg-blue-600 active:bg-blue-700"
                  >
                    {/* <Edit size={16} /> */}
                    <div className="hidden md:block">Tambahkan Topik</div>
                  </Button>
                </DialogTrigger>
                <UpsertDialog
                  updateData={updateData}
                  closeDialog={() => {
                    setIsInsertDialogOpen(false);
                  }}
                  strata={enableDropdown(roles) ? strataFilter : undefined}
                />
              </Dialog>
            )}
          </div>
        }
      />
    </div>
  );
}
