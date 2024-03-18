import DoughnutChartDosbing from "@/types/doughnut-chart-dosbing";
import React, { useCallback, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface DoughnutChartProps {
  doughnutChartData: DoughnutChartDosbing[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ doughnutChartData }) => {
  const chartRefS1 = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRefS1 = useRef<Chart | null>(null);
  const chartRefS2 = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRefS2 = useRef<Chart | null>(null);

  const initializeChart = useCallback(
    (
      canvasRef: React.RefObject<HTMLCanvasElement>,
      chartInstanceRef: React.MutableRefObject<Chart | null>, // Ensure parameter type matches mutable ref object
      level: "S1" | "S2",
    ) => {
      const chartData = doughnutChartData.find((data) => data.level === level);

      if (canvasRef.current && chartData) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // Ensure any existing chart is destroyed
          chartInstanceRef.current?.destroy();

          // Initialize a new chart instance
          const chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: chartData.data.map((item) => item.type),
              datasets: [
                {
                  label: level,
                  data: chartData.data.map((item) => item.amount),
                  borderRadius: 6,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.label || "";
                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed !== null) {
                        label += context.parsed;
                      }
                      return label;
                    },
                  },
                },
              },
            },
          }) as Chart;

          // Store the new chart instance in the mutable ref object
          chartInstanceRef.current = chartInstance;
        }
      }
    },
    [doughnutChartData],
  );

  useEffect(() => {
    initializeChart(chartRefS1, chartInstanceRefS1, "S1");
    initializeChart(chartRefS2, chartInstanceRefS2, "S2");

    // Capture the current chart instances in variables within the effect
    const currentChartInstanceS1 = chartInstanceRefS1.current;
    const currentChartInstanceS2 = chartInstanceRefS2.current;

    // Use the captured variables in the cleanup function
    return () => {
      currentChartInstanceS1?.destroy();
      currentChartInstanceS2?.destroy();
    };
  }, [doughnutChartData, initializeChart]);

  return (
    <div className="flex size-full items-center justify-center gap-4 py-2">
      <div className="flex flex-col items-center gap-2">
        <canvas ref={chartRefS1} className="size-full opacity-80" />
        <h2 className="text-sm text-gray-700">Mahasiswa S1</h2>
      </div>
      <div className="flex flex-col items-center gap-2">
        <canvas ref={chartRefS2} className="size-full opacity-80" />
        <h2 className="text-sm text-gray-700">Mahasiswa S2</h2>
      </div>
    </div>
  );
};

export default DoughnutChart;
