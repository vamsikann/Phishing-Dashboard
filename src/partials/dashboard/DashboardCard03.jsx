import React from "react";
import RadarChart from "../../charts/RadarChart";

import { hexToRGB, tailwindConfig } from '../../utils/Utils';

function DashboardCard03() {
  const radarChartData = {
    labels: ['Metric1', 'Metric2', 'Metric3', 'Metric4', 'Metric5', 'Metric6', 'Metric7'],
    datasets: [
      // Indigo line
      {
        data: [20, 50, 30, 40, 70, 80, 60],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 4,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Wrong Answers Overview
        </h2>
      </div>
      <div className="grow flex justify-center items-center p-5">
        <RadarChart data={radarChartData} width={400} height={300} />
      </div>
    </div>
  );
}

export default DashboardCard03;
