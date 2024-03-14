import clsx from "clsx";
import { VscChevronRight, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import React from "react";

interface TopNavBreadcrumbProps {
  closed: boolean;
  setClosed: (closed: boolean) => void;
}

export default function Breadcrumb({
  closed,
  setClosed,
}: TopNavBreadcrumbProps): JSX.Element {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex h-fit w-full items-center gap-1 p-4 text-gray-600">
      <TooltipProvider>
        <Tooltip delayDuration={25}>
          <TooltipTrigger
            onClick={() => setClosed(!closed)}
            className="mr-1 flex aspect-square size-7 items-center justify-center rounded-sm p-1 transition-all duration-100 ease-in-out hover:bg-gray-200"
          >
            {/* <button
              onClick={() => setClosed(!closed)}
              className="mr-1 flex aspect-square size-7 items-center justify-center rounded-sm p-1 transition-all duration-100 ease-in-out hover:bg-gray-200"
            > */}
            <VscLayoutSidebarLeftOff size={14} className="text-gray-500" />
            {/* </button> */}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gray-900/90 text-gray-100">
            {closed ? (
              <p className="text-xs">Keep sidebar visible</p>
            ) : (
              <p className="text-xs">Hide sidebar</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <VscChevronRight size={10} className="mt-0.5" />}
          <Link to={`/${paths.slice(0, index + 1).join("/")}`}>
            <p
              className={clsx("text-xs capitalize", {
                "font-medium": index === paths.length - 1,
              })}
            >
              {path}
            </p>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
