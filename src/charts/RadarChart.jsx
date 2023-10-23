import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';
import {
  Chart, RadarController, PointElement, LinearScale, Tooltip, Filler, CategoryScale
} from 'chart.js';

// Registration of the required elements for Radar Chart
Chart.register(RadarController, PointElement, LinearScale, Tooltip, Filler, CategoryScale);

function RadarChart({ data, width, height }) {
  
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';

  // Chart colors or configurations can be adjusted as per requirement
  const chartColors = {
    backgroundColor: darkMode ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.2)',
    borderColor: darkMode ? 'rgb(54, 162, 235)' : 'rgb(54, 162, 235)',
  };

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        scales: {
          r: {
            pointLabels: {
              color: chartColors.borderColor,
            },
            grid: {
              color: chartColors.borderColor,
            },
            ticks: {
              backdropColor: chartColors.backgroundColor,
            }
          }
        },
        maintainAspectRatio: false
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, [data, chartColors]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default RadarChart;
