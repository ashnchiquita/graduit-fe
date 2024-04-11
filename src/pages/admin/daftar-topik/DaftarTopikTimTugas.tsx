import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import UpsertDialog from "./components/UpsertDialog";
import useDaftarTopikTimTugas from "./hooks/useDaftarTopikTimTugas";

export default function DaftarTopikTimTugas() {
  const {
    table,
    searchValue,
    isInsertDialogOpen,
    setIsInsertDialogOpen,
    handleChangeSearchValue,
    updateData,
  } = useDaftarTopikTimTugas();
  return (
    <div className="px-4">
      <DataTable
        table={table}
        headline="Daftar Topik"
        description="Topik yang diajukan oleh pembimbing"
        searchValue={searchValue}
        setSearchValue={handleChangeSearchValue}
        searchPlaceholder="Cari topik atau dosen pengaju"
        customElementsRight={
          <Dialog
            open={isInsertDialogOpen}
            onOpenChange={setIsInsertDialogOpen}
          >
            <DialogTrigger>
              <Button
                size="sm"
                className="flex gap-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              >
                <Edit size={16} />
                <div>Tambahkan Topik</div>
              </Button>
            </DialogTrigger>
            <UpsertDialog
              updateData={updateData}
              closeDialog={() => {
                setIsInsertDialogOpen(false);
              }}
            />
          </Dialog>
        }
      />
    </div>
  );
}
