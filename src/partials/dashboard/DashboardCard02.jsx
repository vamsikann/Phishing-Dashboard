import React, { useState, useEffect } from 'react';
import LineChart01 from '../../charts/LineChart01';
import { hexToRGB, tailwindConfig } from '../../utils/Utils';

function DashboardCard02() {
  const tailwind = tailwindConfig();
  const [averageScores, setAverageScores] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/average-scores-by-date')
      .then(response => response.json())
      .then(data => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        const filteredData = data.filter(item => datePattern.test(item.submitDate));
        const labels = filteredData.map(item => item.submitDate);
        const scores = filteredData.map(item => parseFloat(item.averageScore));
        setAverageScores({
          labels,
          datasets: [{ 
            label: 'Average Score', 
            data: scores,
            fill: true,
            backgroundColor: `rgba(${hexToRGB(tailwind.theme.colors.blue[500])}, 0.08)`,
            borderColor: tailwind.theme.colors.indigo[500],
            pointRadius: 3,
            pointHoverRadius: 4,
            pointBackgroundColor: tailwind.theme.colors.indigo[500],
            pointHoverBackgroundColor: tailwind.theme.colors.indigo[500],
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          }]
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
      });
  }, []);

  if (error) {
    return <div>Failed to load data</div>;
  }

  // Use the labels and data from the state for the chart
  const performanceData = {
    labels: averageScores.labels,
    datasets: averageScores.datasets.length > 0 ? averageScores.datasets : [{
      label: 'Performance',
      data: [], // Empty array as a placeholder
      // ...other properties
    }]
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Performance Over Time
        </h2>
      </div>
      <div className="grow flex justify-center items-center p-5">
        <LineChart01 key={JSON.stringify(performanceData)} data={performanceData} height={400} />
      </div>
    </div>
  );
}

export default DashboardCard02;
