type DoughnutChartDataItem = {
  type: string;
  amount: number;
};

type DoughnutChartDosbing = {
  level: "S1" | "S2";
  data: DoughnutChartDataItem[];
};

export default DoughnutChartDosbing;
