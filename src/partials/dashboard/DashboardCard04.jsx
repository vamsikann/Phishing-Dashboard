//We need all of these imports for the expand function to work correctly
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function DashboardCard04() {
  //Canvas elements - one for standard and one for modal
  const chartRef = useRef(null);
  const modalChartRef = useRef(null);

  //instances of chart - used to manage life cycle of standard and modal chart
  let chartInstance = null;
  let modalChartInstance = null;

  //state to track if modal is open or closed
  const [isModalOpen, setModalOpen] = useState(false);

  //EDIT MODAL GRAPH HERE. CHANGE ONLY THE BACKGROUND COLOR.
  const modalBackgroundColorPlugin = {
    id: "modal_background_color",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.fillStyle = "#2a344d";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  //Gaussian distribution function. Should be correct. Source: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
  function gaussian(x, mean, stdDev) {
    return (
      Math.exp(-Math.pow((x - mean) / (2 * stdDev), 2)) /
      (stdDev * Math.sqrt(2 * Math.PI))
    );
  }

  //Initialize and render the chart
  function initializeChart(data, canvasRef, isModal = false) {
    const instance = isModal ? modalChartInstance : chartInstance;

    //we need to destroy the instance if it exists (overwrites BarChart01 template)
    if (instance) {
      instance.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    //Create our own chart instance
    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        backgroundColor: "transparent",
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Scores",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Probability Density",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: isModal ? [modalBackgroundColorPlugin] : [],
    });

    //start the instance
    if (isModal) {
      modalChartInstance = newChartInstance;
    } else {
      chartInstance = newChartInstance;
    }
  }

  //Fetch API Data from your LOCAL endpoint. CHANGE THE PATH.
  function fetchDataAndInitializeChart(canvasRef, isModal = false) {
    fetch("http://localhost:5000/api/get-score-distribution")
      .then((response) => response.json())
      .then((data) => {
        const total = data.reduce((acc, curr) => acc + curr[0] * curr[1], 0);
        const count = data.reduce((acc, curr) => acc + curr[1], 0);
        const mean = total / count;
        const variance =
          data.reduce(
            (acc, curr) => acc + Math.pow(curr[0] - mean, 2) * curr[1],
            0
          ) / count;
        const stdDev = Math.sqrt(variance);

        const values = Array.from(
          {
            length: 101,
          },
          (_, i) => i
        ).map((x) => gaussian(x, mean, stdDev));

        //Edit modal and standard chart backgroundColor and borderColor of the LINE in the charts here.
        const formattedData = {
          labels: Array.from(
            {
              length: 101,
            },
            (_, i) => i.toString()
          ),
          datasets: [
            {
              label: "Score Distribution",
              data: values,
              backgroundColor: isModal ? "#6668eb" : "#6668eb",
              borderColor: isModal ? "#6668eb" : "#6668eb",
              borderWidth: 2,
            },
          ],
        };

        initializeChart(formattedData, canvasRef, isModal);
      });
  }

  // To toggle the check to see if modal is open or not
  function toggleModal() {
    setModalOpen(!isModalOpen);

    if (!isModalOpen) {
      fetchDataAndInitializeChart(modalChartRef, true);
    }
  }

  //fetch data and initialize charts
  useEffect(() => {
    fetchDataAndInitializeChart(chartRef);
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      if (modalChartInstance) {
        modalChartInstance.destroy();
      }
    };
  }, []);

  //rendering html and css for charts. DO NOT CHANGE unless you are familiar.
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          {" "}
          Score Distribution{" "}
        </h2>{" "}
      </header>{" "}
      <canvas ref={chartRef} width={595} height={248}>
        {" "}
      </canvas>{" "}
      <button onClick={toggleModal}> Expand </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="bg-white rounded shadow-lg relative"
            style={{
              width: "85%",
              height: "85%",
            }}
          >
            <canvas
              ref={modalChartRef}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {" "}
            </canvas>{" "}
            <button
              onClick={toggleModal}
              className="absolute top-0 right-0 p-2"
            >
              {" "}
              X{" "}
            </button>{" "}
          </div>{" "}
          <div
            className="absolute top-0 left-0 w-full h-full"
            onClick={toggleModal}
          >
            {" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default DashboardCard04;
