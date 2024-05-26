import clsx from "clsx";

export default function StatusTugasBadge({
  selesai,
}: {
  selesai: boolean;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "flex w-fit items-center gap-1 rounded-xl px-2 py-1",
        selesai ? "bg-green-100" : "bg-red-100",
      )}
    >
      <div
        className={clsx(
          "aspect-square size-1 rounded-full",
          selesai ? "bg-green-500" : "bg-red-500",
        )}
      />
      <p
        className={clsx(
          "text-xs font-medium capitalize",
          selesai ? "text-green-700" : "text-red-700",
        )}
      >
        {selesai ? "Selesai" : "Belum Mengerjakan"}
      </p>
    </div>
  );
}
