import { StatusPendaftaranEnum } from "@/types/status-pendaftaran";
import clsx from "clsx";

export default function StatusPendaftaranBadge({
  status,
}: {
  status: StatusPendaftaranEnum;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "flex w-fit items-center gap-1 rounded-xl px-2 py-1",
        status === StatusPendaftaranEnum.ACCEPTED
          ? "bg-green-100"
          : status === StatusPendaftaranEnum.PROCESS
            ? "bg-yellow-100"
            : "bg-red-100",
      )}
    >
      <div
        className={clsx(
          "aspect-square size-1 rounded-full",
          status === StatusPendaftaranEnum.ACCEPTED
            ? "bg-green-500"
            : status === StatusPendaftaranEnum.PROCESS
              ? "bg-yellow-500"
              : "bg-red-500",
        )}
      />
      <p
        className={clsx(
          "text-xs font-medium capitalize",
          status === StatusPendaftaranEnum.ACCEPTED
            ? "text-green-700"
            : status === StatusPendaftaranEnum.PROCESS
              ? "text-yellow-700"
              : "text-red-700",
        )}
      >
        {status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </div>
  );
}
