import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const RealChart1 = () => {
  const [chartData, setChartData] = useState({
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Students',
        data: [0, 0],  // Initialize with zeros
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch dynamic data from Django backend
    fetch('http://127.0.0.1:8000/chart1')  // Update with your Django API endpoint
      .then(response => response.json())
      .then(data => {
        const { male_no, female_no } = data;
        const updatedChartData = {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [male_no, female_no],
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
      <Pie
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
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default RealChart1;
