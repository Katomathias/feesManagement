import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const RealChart2 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Students',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch dynamic data from Django backend
    fetch('http://127.0.0.1:8000/nationality_counts')  // Update with your Django API endpoint
      .then(response => response.json())
      .then(data => {
        const updatedChartData = {
          ...chartData,
          labels: data.nationalities,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data.counts,
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
      <Bar
        data={chartData}
        height={150}
        width={300}
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

export default RealChart2;
