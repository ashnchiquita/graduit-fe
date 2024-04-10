import clsx from "clsx";

import LogoGreen from "@/assets/statistic-card/logo-green.svg";
import LogoOrange from "@/assets/statistic-card/logo-orange.svg";
import LogoRed from "@/assets/statistic-card/logo-red.svg";

type StatisticCardProps = {
  title: string;
  count: number;
  percentage: number;
  color: "GREEN" | "ORANGE" | "RED";
};

export default function StatisticCard({
  title,
  count,
  percentage,
  color,
}: StatisticCardProps): JSX.Element {
  return (
    <div className="flex w-[22.2vw] flex-col gap-4 rounded-xl p-6 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <h4 className="max-w-[160px] text-[#202224]">
            Total Pengajuan <span className="font-bold">{title}</span>
          </h4>
          <p className="text-3xl font-bold text-[#202224]">{count}</p>
        </div>

        <img
          src={
            color === "GREEN"
              ? LogoGreen
              : color === "ORANGE"
                ? LogoOrange
                : LogoRed
          }
          className="size-[60px]"
          alt=""
        />
      </div>

      <p className="text-base font-semibold">
        <span
          className={clsx(
            color === "GREEN"
              ? "text-[#00B69B]"
              : color === "ORANGE"
                ? "text-amber-600"
                : "text-destructive",
          )}
        >
          {percentage}%
        </span>{" "}
        dari total mahasiswa
      </p>
    </div>
  );
}
