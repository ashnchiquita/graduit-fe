import { RiCheckboxCircleFill } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import { Row } from "@tanstack/react-table";
import { BimbinganLogs } from "../types";

export default function StatusCircle({
  row,
}: {
  row: Row<BimbinganLogs>;
}): JSX.Element {
  return (
    <div className="flex justify-center">
      {row.original.status ? (
        <RiCheckboxCircleFill className="text-green-400" />
      ) : (
        <RiCloseCircleFill className="text-red-600" />
      )}
    </div>
  );
}
