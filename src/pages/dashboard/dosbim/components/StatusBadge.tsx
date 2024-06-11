import { StatusBimbingan } from "../types";

interface StatusBadgeProps {
  status: StatusBimbingan;
}

export default function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  return (
    <div
      className={`flex w-fit items-center gap-1 rounded-xl px-2 py-1 ${
        status === "lancar"
          ? "bg-green-100"
          : status === "butuh_bimbingan"
            ? "bg-yellow-100"
            : "bg-red-100"
      }`}
    >
      <div
        className={`aspect-square size-1 rounded-full ${
          status === "lancar"
            ? "bg-green-500"
            : status === "butuh_bimbingan"
              ? "bg-yellow-500"
              : "bg-red-500"
        }`}
      />
      <p
        className={` ${
          status === "lancar"
            ? "text-green-700"
            : status === "butuh_bimbingan"
              ? "text-yellow-700"
              : "text-red-700"
        } text-xs
        font-medium capitalize`}
      >
        {/* {status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())} */}
        {status.toLowerCase().split("_").join(" ")}
      </p>
    </div>
  );
}
