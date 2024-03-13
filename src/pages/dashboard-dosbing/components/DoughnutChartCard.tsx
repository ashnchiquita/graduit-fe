import DoughnutChartDosbing from "@/types/doughnut-chart-dosbing";
import DoughnutChart from "./DoughnutChart";

// Props
interface DoughnutChartCardProps {
  title: string;
  desc: string;
  data: DoughnutChartDosbing[];
}

export default function DoughnutChartCard({
  title,
  desc,
  data,
}: DoughnutChartCardProps): JSX.Element {
  return (
    <div className="w-full rounded-lg bg-white p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-medium">{title}</h1>
          <p className="text-xs">{desc}</p>
        </div>
        <DoughnutChart doughnutChartData={data} />
      </div>
    </div>
  );
}
