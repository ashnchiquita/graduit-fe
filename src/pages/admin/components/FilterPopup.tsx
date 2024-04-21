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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropdownRoleFilter from "../kelola-akun/components/DropdownRoleFilter";
import SelectedRoleFilter from "../kelola-akun/components/SelectedRoleFIlter";
import { KeyedMutator } from "swr";
import { Account } from "../types";

interface ComponentProps {
  openFilterDialog: boolean;
  setOpenFilterDialog: React.Dispatch<React.SetStateAction<boolean>>;
  namaValue: string;
  setNamaValue: React.Dispatch<React.SetStateAction<string>>;
  emailValue: string;
  setEmailValue: React.Dispatch<React.SetStateAction<string>>;
  roleValue: RoleEnum[];
  setRoleValue: React.Dispatch<React.SetStateAction<RoleEnum[]>>;
  handleRoleValueChange: (val: RoleEnum) => void;
  fetchData: KeyedMutator<Account[]>;
}

const FilterPopup = ({
  openFilterDialog,
  setOpenFilterDialog,
  namaValue,
  setNamaValue,
  emailValue,
  setEmailValue,
  roleValue,
  setRoleValue,
  handleRoleValueChange,
  fetchData,
}: ComponentProps) => {
  return (
    <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
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
            value={namaValue}
            onChange={(val) => {
              setNamaValue(val.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label>Filter bersadarkan email</Label>
          <Input
            placeholder="Masukkan email disini..."
            value={emailValue}
            onChange={(val) => {
              setEmailValue(val.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label>Filter bersadarkan role</Label>
          <SelectedRoleFilter
            roleValue={roleValue}
            handleRoleValueChange={handleRoleValueChange}
          />
          <DropdownRoleFilter handleRoleChange={handleRoleValueChange} />
        </div>
        <DialogFooter className="items-end">
          <Button
            variant={"ghost"}
            className="border border-input"
            onClick={() => {
              setNamaValue("");
              setEmailValue("");
              setRoleValue([]);
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
