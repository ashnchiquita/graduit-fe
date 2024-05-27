import { Jenis, ViewSelectJenisProps } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";

const ViewDropdownJenis = ({
  viewJenis,
  setViewJenis,
}: ViewSelectJenisProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex h-fit flex-row items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-200"
        >
          <FiEye />
          {viewJenis ?? "Jenis Sidang"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={viewJenis}
          onValueChange={(e) => {
            setViewJenis(e as Jenis);
          }}
        >
          <DropdownMenuRadioItem value="Semua">Semua</DropdownMenuRadioItem>
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

export default ViewDropdownJenis;
