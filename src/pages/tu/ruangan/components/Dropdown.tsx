import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscChevronDown } from "react-icons/vsc";

interface DropdownProps {
  selectedOption: string;
  handleChange: (val: string) => void;
  options: string[];
}

const Dropdown = ({ selectedOption, handleChange, options }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className=" flex flex-row items-center gap-2 rounded-md border-[0.5px] border-gray-300 bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200">
          <div>{selectedOption}</div>
          <VscChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((opt) => (
          <DropdownMenuItem onClick={() => handleChange(opt)} key={opt}>
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
