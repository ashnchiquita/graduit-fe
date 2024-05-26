import { JenisSelectProps } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";

const JenisDropdown = ({ jenis, setJenis }: JenisSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
        >
          <FiEye />
          {jenis}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={jenis} onValueChange={setJenis}>
            <DropdownMenuRadioItem value="Semua">
                Semua
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Seminar Proposal">
            Seminar Proposal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Seminar Tesis">
            Seminar Tesis
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Sidang Tesis">
            Sidang Tesis
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JenisDropdown;
