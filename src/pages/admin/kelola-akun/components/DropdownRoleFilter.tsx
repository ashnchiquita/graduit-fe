import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoleEnum } from "@/types/session-data";
import { RoleAccess } from "../../types";

interface ComponentProps {
  handleRoleChange: (role: RoleEnum) => void;
  roleAccess: RoleAccess[];
}

const DropdownRoleFilter = ({
  handleRoleChange,
  roleAccess,
}: ComponentProps) => {
  return (
    <Select
      onValueChange={(val) => {
        handleRoleChange(val as RoleEnum);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih role disini" />
      </SelectTrigger>
      <SelectContent>
        {roleAccess.map((role) => (
          <SelectItem key={role.id} value={role.name}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownRoleFilter;
