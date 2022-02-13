import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function DataVisualization() {
  

  let history = useHistory()
  const [user,setUser] = useState()
  const[maleFemale,setMaleFemale] = useState([])


  useEffect(async() => {
    const data = await axios
      .get(`https://gorest.co.in/public/v2/users`)
      .then((response) => {
        let status = "status" in response;
        if (!status) {
          response.status = 401;
          return response;
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

      console.log(data)
      setUser(data)
      let male = data.filter((item) => item.gender == 'male')
      let female = data.filter((item) => item.gender == 'female')
      let temp = [
        male.length,female.length
      ]
      setMaleFemale(temp)

  },[])

  let data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Votes',
        data: maleFemale,
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
  };

  return (
    <section className="data-analysis">
      <div className="row">
      <Pie data={data} />;
      </div>
    </section>
  );
}
