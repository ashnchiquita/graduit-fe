import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Select
      onValueChange={(val) => {
        handleRoleChange(val as RoleEnum);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih role disini" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(RoleEnum).map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownRoleFilter;
