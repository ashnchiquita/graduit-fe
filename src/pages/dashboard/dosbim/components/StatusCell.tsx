import { Row } from "@tanstack/react-table";
import { MahasiswaBimbingan, StatusBimbingan } from "../types";
import StatusBadge from "./StatusBadge";

export default function StatusCell({
  row,
}: {
  row: Row<MahasiswaBimbingan>;
}): JSX.Element {
  return (
    <StatusBadge
      status={row.original.status.toLowerCase() as StatusBimbingan}
    />
  );
}
