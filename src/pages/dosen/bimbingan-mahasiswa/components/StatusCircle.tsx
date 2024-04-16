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
        <button className="rounded-md border border-gray-500 px-8 py-2 text-gray-500 hover:bg-red-500 hover:border-red-500 hover:text-white">
          Batalkan pengesahan
        </button>
      ) : (
        <button className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 w-[100%]">
          Sahkan
        </button>
      )}
    </div>
  );
}
