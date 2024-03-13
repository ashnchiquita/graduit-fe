import BarChartDosbing from "@/types/bar-chart-dosbing";
import BarChart from "./BarChart";

// Props
interface BarChartCardProps {
  title: string;
  desc: string;
  data: BarChartDosbing[];
}

export default function BarChartCard({
  title,
  desc,
  data,
}: BarChartCardProps): JSX.Element {
  return (
    <div className="w-full rounded-lg bg-white p-4">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-medium">{title}</h1>
          <p className="text-xs">{desc}</p>
        </div>
        <div className="flex size-full items-center justify-center py-2">
          <BarChart data={data} />
        </div>
      </div>
    </div>
  );
}
