import { StatusSelectProps } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";

const StatusDropdown = ({ status, setStatus }: StatusSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
        >
          <FiEye />
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="Semua">Semua</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Diterima">
            Diterima
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Ditolak">
            Ditolak
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Sidang">
            Sidang
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
