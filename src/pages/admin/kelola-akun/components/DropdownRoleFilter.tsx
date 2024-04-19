import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleEnum } from "@/types/session-data";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ComponentProps {
  handleRoleChange: (role: RoleEnum) => void;
}

const DropdownRoleFilter = ({ handleRoleChange }: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="w-full">
        <Button
          className="flex w-full flex-row justify-between rounded-md border border-input text-sm font-normal text-muted-foreground"
          variant={"ghost"}
        >
          <p>Pilih role disini</p>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(RoleEnum).map((role) => (
          <DropdownMenuItem key={role} onSelect={() => handleRoleChange(role)}>
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownRoleFilter;
