import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Sheet, Upload } from "lucide-react";
import UpsertDialog from "./components/UpsertDialog";
import useDaftarTopik from "./hooks/useDaftarTopik";
import { RoleEnum } from "@/types/session-data";

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
        allowHorizontalOverflow
        customElementsRight={
          <>
            {(roles?.includes(RoleEnum.ADMIN) ||
              roles?.includes(RoleEnum.S2_TIM_TESIS) ||
              roles?.includes(RoleEnum.S1_TIM_TA)) && (
              <>
                <Button
                  size="sm"
                  className="hidden gap-2 border-blue-500 text-blue-500 hover:text-blue-500 md:flex"
                  onClick={handleClickGenerateTemplate}
                  variant="outline"
                >
                  <Sheet size={16} />
                  <div>Download Template</div>
                </Button>

                <Button
                  size="sm"
                  className="hidden gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 md:flex"
                  onClick={handleClickImportFromTemplate}
                >
                  <Upload size={16} />
                  <div>Import Template (.xlsx)</div>
                </Button>
              </>
            )}

            {(roles?.includes(RoleEnum.ADMIN) ||
              roles?.includes(RoleEnum.S2_TIM_TESIS) ||
              roles?.includes(RoleEnum.S1_TIM_TA) ||
              roles?.includes(RoleEnum.S1_PEMBIMBING) ||
              roles?.includes(RoleEnum.S2_PEMBIMBING)) && (
              <Dialog
                open={isInsertDialogOpen}
                onOpenChange={setIsInsertDialogOpen}
              >
                <DialogTrigger>
                  <Button
                    size="sm"
                    className="flex gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  >
                    <Edit size={16} />
                    <div className="hidden md:block">Tambahkan Topik</div>
                  </Button>
                </DialogTrigger>
                <UpsertDialog
                  updateData={updateData}
                  closeDialog={() => {
                    setIsInsertDialogOpen(false);
                  }}
                />
              </Dialog>
            )}
          </>
        }
      />
    </div>
  );
}
