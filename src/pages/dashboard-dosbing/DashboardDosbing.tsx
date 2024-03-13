import BarChartCard from "./components/BarChartCard";
import BarChartDosbing from "@/types/bar-chart-dosbing";
import DoughnutChartCard from "./components/DoughnutChartCard";
import DoughnutChartDosbing from "@/types/doughnut-chart-dosbing";

const DashboardDosbing = () => {
  const barChartData: BarChartDosbing[] = [
    { level: "S1", lancar: 10, bimbingan: 5, terkendala: 3 },
    { level: "S2", lancar: 8, bimbingan: 2, terkendala: 4 },
  ];

  const doughnutChartData: DoughnutChartDosbing[] = [
    {
      level: "S1",
      data: [
        {
          type: "IF",
          amount: 10,
        },
        {
          type: "STI",
          amount: 5,
        },
      ],
    },
    {
      level: "S2",
      data: [
        {
          type: "Ilmu Komputer (CS)",
          amount: 8,
        },
        {
          type: "Sistem Informasi (SI)",
          amount: 2,
        },
        {
          type: "Sistem Inteligensi (IntS)",
          amount: 4,
        },
        {
          type: "Komputasi Cloud (CC)",
          amount: 3,
        },
      ],
    },
  ];

  return (
    <div className="size-full px-4">
      <div className="flex w-full gap-2">
        <BarChartCard
          title="Progress Mahasiswa"
          desc="Statistik mahasiswa bimbingan beserta statusnya."
          data={barChartData}
        />
        <DoughnutChartCard
          title="Jalur Pilihan Mahasiswa"
          desc="Proporsi jalur pilihan mahasiswa bimbingan. Hover untuk melihat detail."
          data={doughnutChartData}
        />
      </div>
    </div>
  );
};

export default DashboardDosbing;
