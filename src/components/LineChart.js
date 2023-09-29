import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'


function LineChart() {
  
  /*const [url, setUrl] = useState("http://127.0.0.1:8000/chart1");
  const [data, setData] = useState()

  useEffect(()=>{
    fetch(url)
    .then(res => {
        if(!res.ok){
            throw Error(res.statusText);
        }
        return res.json();
    })
    .then(data =>{
      setData(data);
      
  })
    
    .catch(err =>{
        console.log(err.message);
    })
  },[]) */
  const [data, setData] = useState({});
  const [genderLabels, setGenderLabels] = useState([]);
  const [genderNumbers, setGenderNumbers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    

    try {
      const response = await fetch("http://127.0.0.1:8000/chart1");
      const jsonData = await response.json();
      setData(jsonData);
      
    setGenderLabels(jsonData.gender_list);
    setGenderNumbers(jsonData.gender_number);  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (data.male_no !== undefined) {
      const ctx = document.getElementById('itemChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Items'],
          datasets: [
            {
              label: 'Number of Males',
              data: [data.male_no],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [data]);
  return (
    <div className='barchart'>
       <h2>Dynamic Item Count Chart</h2>
      <canvas id="itemChart" width="400" height="200"></canvas>
    </div>
  )
}

export default LineChart