import clsx from "clsx";

export default function JenisSidangBadge({
  jenis,
}: {
  jenis: string;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "flex w-fit items-center gap-1 rounded-xl px-2 py-1",
        jenis === "Sidang Tesis"
          ? "bg-green-700"
          : jenis === "Seminar Proposal"
            ? "bg-blue-600"
            : "bg-indigo-400",
      )}
    >
      <div
        className={clsx(
          "aspect-square size-1 rounded-full",
          jenis === "Sidang Tesis"
            ? "bg-green-900"
            : jenis === "Seminar Proposal"
              ? "bg-blue-900"
              : "bg-indigo-600",
        )}
      />
      <p className={clsx("text-xs font-medium capitalize", "text-white")}>
        {jenis.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </div>
  );
}
