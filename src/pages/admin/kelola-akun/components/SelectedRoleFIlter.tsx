import { Badge } from "@/components/ui/badge";
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
    <ul className="col-start-1 col-end-4 row-start-6 row-end-6 flex flex-wrap gap-2 lg:col-start-2 lg:col-end-4 lg:row-start-4 lg:row-end-4">
      {roleValue.map((access, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-2 rounded-md py-1 text-xs font-medium text-primary"
        >
          {access}
          <button
            onClick={() => {
              handleRoleValueChange(access);
            }}
          >
            <VscChromeClose />
          </button>
        </Badge>
      ))}
    </ul>
  );
};

export default SelectedRoleFilter;
