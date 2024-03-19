import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import BarChartDosbing from "@/types/bar-chart-dosbing";

interface BarChartProps {
  data: BarChartDosbing[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      if (ctx) {
        const chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Lancar", "Butuh Bimbingan", "Terkendala"],
            datasets: [
              {
                label: "S1",
                data: [data[0].lancar, data[0].bimbingan, data[0].terkendala],
                backgroundColor: "rgba(2, 132, 199, 0.9)",
                borderRadius: 8,
                maxBarThickness: 40,
              },
              {
                label: "S2",
                data: [data[1].lancar, data[1].bimbingan, data[1].terkendala],
                backgroundColor: "rgba(125, 211, 252, 0.9)",
                borderRadius: 8,
                maxBarThickness: 40,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  font: {
                    family: "Satoshi",
                  },
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    family: "Satoshi",
                    size: 10,
                  },
                },
              },
            },
            plugins: {
              legend: {
                position: "right",
                labels: {
                  boxWidth: 12,
                  boxHeight: 12,
                  borderRadius: 10,
                  font: {
                    size: 12,
                    family: "Satoshi",
                  },
                },
              },
              tooltip: {
                titleFont: {
                  family: "Satoshi",
                },
                bodyFont: {
                  size: 12,
                  family: "Satoshi",
                },
              },
            },
          },
        });

        // Store the chart instance in the ref
        chartInstanceRef.current = chartInstance;
      }
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  // Use effect hook for observing container size changes
  useEffect(() => {
    if (chartRef.current && chartInstanceRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (chartInstanceRef.current) {
            const cr = entry.contentRect;
            chartInstanceRef.current.resize(cr.width, cr.height);
          }
        }
      });

      // Observe the chart container
      resizeObserver.observe(chartRef.current);
      resizeObserverRef.current = resizeObserver;

      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }
  }, []);

  return <canvas ref={chartRef} height={200} />;
};

export default BarChart;
