import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Edit} from "lucide-react";
import useTopik from "./hooks/useTopik";
import useSession from "@/hooks/useSession";
import { RoleEnum } from "@/types/session-data";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertDialog from "@/pages/admin/daftar-topik/components/UpsertDialog";

export default function TopicAllocation() {
  const { table,
    searchValue,
    isInsertDialogOpen,
    handleSearchValueChange,
    fetchData,
    setIsInsertDialogOpen,
    handleClickImportFromTemplate 
  } = useTopik();

  const {data, isLoading} = useSession()

  const isAbleToCreate = data?.roles.includes(RoleEnum.ADMIN) || data?.roles.includes(RoleEnum.S1_TIM_TA)

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="size-20 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
      </div>
    );
  } else {
    return (
      <>
      <main className="flex flex-col p-5 min-h-full min-w-full md:min-w-0">
      <DataTable
        table={table}
        headline="Daftar Topik"
        description="Topik yang diajukan oleh dosen pembimbing"
        searchPlaceholder="Cari topik atau dosen"
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        customElementsRight={
          isAbleToCreate ? (
          <>
          <Button
          size="sm"
          onClick={() => (isAbleToCreate ? handleClickImportFromTemplate : undefined)}
          className="hidden md:block flex gap-2 border border-blue-500 bg-white px-2 py-1 hover:border-blue-600 hover:bg-gray-300"
          >
          <Download color={"blue"} size={16} />
          <div className="hidden md:block md:text-blue-500">Import Topik (.xlsx)</div>
          </Button>

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
                updateData={fetchData}
                closeDialog={() => {
                  setIsInsertDialogOpen(false);
                }}
              />
            </Dialog>
        </>
        ) : (
        <></>
        )
      }
      />
      </main>
      </>
    );
  }
}
