import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function PassFailBarChart() {
    const [passCount, setPassCount] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/scores')
            .then(response => response.json())
            .then(data => {
                let pass = 0;
                let fail = 0;
                data.forEach(([_, score]) => {
                    if (score >= 70) {
                        pass++;
                    } else {
                        fail++;
                    }
                });
                setPassCount(pass);
                setFailCount(fail);
            })
            .catch(err => {
                console.error('Error fetching scores:', err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const chartData = {
    labels: ['Pass', 'Fail'],
    datasets: [
        {
            label: 'Pass',
            data: [passCount, 0],
            backgroundColor: '#312e81',
            borderColor: '#312e81',
            borderWidth: 1,
        },
        {
            label: 'Fail',
            data: [0, failCount],
            backgroundColor: '#a855f7',
            borderColor: '#a855f7',
            borderWidth: 1,
        }
    ]
};

const options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            barThickness: 40,
            maxBarThickness: 50,
            stacked: true,
        },
        y: {
            beginAtZero: true,
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
};



    return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-full">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pass vs Fail Distribution</h2>
        </header>
        <div className="p-5 flex-grow flex flex-col justify-center">
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data.</p>}
            <div className="flex-grow">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    </div>
);
}

export default PassFailBarChart;
