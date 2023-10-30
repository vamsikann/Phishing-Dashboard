import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/top-wrong-questions')
      .then(response => response.json())
      .then(data => {
        const labels = data.map(item => item[0]).slice(0, 4); 
        const counts = data.map(item => item[1]).slice(0, 4); 
  
        setChartData({
          labels: labels,
          datasets: [{
            label: 'Top Wrong Questions',
            data: counts,
            backgroundColor: [
              tailwindConfig().theme.colors.indigo[500],
              tailwindConfig().theme.colors.blue[400],
              tailwindConfig().theme.colors.indigo[900],
              tailwindConfig().theme.colors.purple[500], 
            ],
            hoverBackgroundColor: [
              tailwindConfig().theme.colors.indigo[600],
              tailwindConfig().theme.colors.blue[500],
              tailwindConfig().theme.colors.indigo[900],
              tailwindConfig().theme.colors.purple[600], 
            ],
            borderWidth: 0,
          }],
        });
      })
      
  
      .catch(err => {
        console.error('There was an error fetching the top wrong questions', err);
        setError('Failed to load data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!chartData || chartData.labels.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Wrong Answers</h2>
      </header>
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;

