import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/types/session-data";
import { VscChromeClose } from "react-icons/vsc";

interface ComponentProps {
  roleValue: RoleEnum[];
  handleRoleValueChange: (val: RoleEnum) => void;
}

const SelectedRoleFilter = ({
  roleValue,
  handleRoleValueChange,
}: ComponentProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {roleValue.map((role) => (
        <Button
          onClick={() => handleRoleValueChange(role)}
          key={role + "_selected"}
          className="h-fit gap-2 bg-slate-200 px-2 py-1 font-normal text-gray-600 hover:bg-slate-300"
        >
          {role} <VscChromeClose color="gray-600" />
        </Button>
      ))}
    </div>
  );
};

export default SelectedRoleFilter;
