import { RoleEnum } from "@/types/session-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VscListFilter } from "react-icons/vsc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropdownRoleFilter from "./DropdownRoleFilter";
import SelectedRoleFilter from "./SelectedRoleFIlter";
import { KeyedMutator } from "swr";
import { Account } from "../../types";

interface ComponentProps {
  openFilterDialog: boolean;
  setOpenFilterDialog: React.Dispatch<React.SetStateAction<boolean>>;
  filterNama: string;
  handleFilterNamaChange: React.Dispatch<React.SetStateAction<string>>;
  filterEmail: string;
  handleFilterEmailChange: React.Dispatch<React.SetStateAction<string>>;
  filterRole: RoleEnum[];
  setFilterRole: React.Dispatch<React.SetStateAction<RoleEnum[]>>;
  handleRoleValueChange: (val: RoleEnum) => void;
  fetchData: KeyedMutator<Account[]>;
}

const FilterPopup = ({
  openFilterDialog,
  setOpenFilterDialog,
  filterNama,
  handleFilterNamaChange,
  filterEmail,
  handleFilterEmailChange,
  filterRole,
  setFilterRole,
  handleRoleValueChange,
  fetchData,
}: ComponentProps) => {
  return (
    <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
        >
          <VscListFilter size={14} />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader className=" items-start">
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        {/* INPUT */}
        <div className="space-y-1">
          <Label>Filter bersadarkan Nama</Label>
          <Input
            placeholder="Masukkan nama disini..."
            value={filterNama}
            onChange={(val) => {
              handleFilterNamaChange(val.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label>Filter bersadarkan email</Label>
          <Input
            placeholder="Masukkan email disini..."
            value={filterEmail}
            onChange={(val) => {
              handleFilterEmailChange(val.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label>Filter bersadarkan role</Label>
          <SelectedRoleFilter
            roleValue={filterRole}
            handleRoleValueChange={handleRoleValueChange}
          />
          <DropdownRoleFilter handleRoleChange={handleRoleValueChange} />
        </div>
        <DialogFooter className="items-end">
          <Button
            variant={"ghost"}
            className="border border-input"
            onClick={() => {
              handleFilterNamaChange("");
              handleFilterEmailChange("");
              setFilterRole([]);
              fetchData();
            }}
          >
            Clear
          </Button>
          <Button
            className="bg-blue-600"
            onClick={() => {
              setOpenFilterDialog(false);
              fetchData();
            }}
          >
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
      <DialogOverlay />
    </Dialog>
  );
};

export default FilterPopup;
