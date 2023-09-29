import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const RealChart3 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Amount by Levels',
        data: [],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Fetch dynamic data from Django backend
    fetch('http://127.0.0.1:8000/amount_by_levels')  // Update with your Django API endpoint
      .then(response => response.json())
      .then(data => {
        const updatedChartData = {
          ...chartData,
          labels: data.levels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data.amounts,
            },
          ],
        };
        setChartData(updatedChartData);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  }, []);  // Empty dependency array to run only once

  return (
    <div>
      <Line
        data={chartData}
        height={300}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default RealChart3;
