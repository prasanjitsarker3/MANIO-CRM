/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface MonthlyData {
  month: string;
  year: string;
  totalOrder: number;
  totalQuantity: number;
}

const MonthlyDataShow = ({ monthlyData }: { monthlyData: MonthlyData[] }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false); // Track whether the component is mounted

  useEffect(() => {
    setIsMounted(true);
    const data = {
      series: [
        {
          name: "Orders",
          data: monthlyData.map((data) => data.totalOrder),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: string) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: monthlyData.map((data) => data.month),
          position: "top",
          axisBorder: { show: false },
          axisTicks: { show: false },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: { enabled: true },
        },
        yaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: {
            show: false,
            formatter: function (val: string) {
              return val;
            },
          },
        },
      },
    };
    setChartData(data); // Set the chart data only on the client side
  }, [monthlyData]);

  if (!isMounted || !chartData) {
    return null; // Render nothing until mounted and chartData is set
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          //@ts-ignore
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MonthlyDataShow;
