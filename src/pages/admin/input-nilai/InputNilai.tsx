import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import InputNilaiMobileTable from "./components/InputNilaiMobileTable";
import UbahNilaiDialog from "./components/UbahNilaiDialog";
import useInputNilai from "./hooks/useInputNilai";

export default function InputNilai() {
  const {
    table,
    rowSelection,
    changeScoreModalOpen,
    changeScoreModalData,
    selectFilterOptions,
    searchValue,
    selectFilterValue,
    setSelectFilterValue,
    handleSearchValueChange,
    handleClickBulkUbahNilai,
    handleClickSingleUbahNilai,
    updateData,
    setChangeScoreModalOpen,
    handleCloseUbahNilaiDialog,
  } = useInputNilai();

  return (
    <div className="px-4">
      <section className="hidden md:block">
        <DataTable
          table={table}
          headline="Input Nilai Mahasiswa"
          selectFilterOptions={selectFilterOptions}
          selectFilterValue={selectFilterValue}
          setSelectFilterValue={setSelectFilterValue}
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          searchPlaceholder="Cari nama atau email"
          customElementsRight={
            <Dialog
              open={changeScoreModalOpen}
              onOpenChange={setChangeScoreModalOpen}
            >
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                onClick={() => {
                  handleClickBulkUbahNilai();
                }}
                disabled={Object.keys(rowSelection).length === 0}
              >
                Ubah Nilai
              </Button>
              <UbahNilaiDialog
                isOpen={changeScoreModalOpen}
                closeDialog={handleCloseUbahNilaiDialog}
                updateData={updateData}
                data={changeScoreModalData}
              />
            </Dialog>
          }
        />
      </section>

      <InputNilaiMobileTable
        table={table}
        handleClickBulkUbahNilai={handleClickBulkUbahNilai}
        selectFilterOptions={selectFilterOptions}
        selectFilterValue={selectFilterValue}
        setSelectFilterValue={setSelectFilterValue}
        searchValue={searchValue}
        setSearchValue={handleSearchValueChange}
        searchPlaceholder="Cari nama atau email"
        handleClickSingleUbahNilai={handleClickSingleUbahNilai}
      />
    </div>
  );
}
