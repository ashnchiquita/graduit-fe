import { Row } from "@tanstack/react-table";
import { Account } from "../hooks/useKelolaAkun";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AccessCell({
  row,
}: {
  row: Row<Account>;
}): JSX.Element {
  if (row.original.access.length > 1) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="cursor-pointer text-xs font-medium text-blue-500">
              {row.original.access.length} Akses
            </p>
          </TooltipTrigger>

          <TooltipContent>
            <ul className="flex items-center">
              {row.original.access.map((access, index) => (
                <div className="flex" key={index}>
                  <li className="text-xs font-medium text-primary">{access}</li>
                  {index !== row.original.access.length - 1 ? (
                    <p className="text-xs font-medium text-primary">,&nbsp;</p>
                  ) : null}
                </div>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else if (row.original.access.length === 1) {
    return (
      <ul className="flex max-w-full items-center gap-2 overflow-hidden">
        {row.original.access.map((access, index) => (
          <li key={index} className="shrink-0">
            <Badge
              variant="secondary"
              className="rounded-md text-xs font-medium text-primary"
            >
              {access}
            </Badge>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p className="text-xs font-medium text-red-500">Belum Ada Akses</p>;
  }
}
