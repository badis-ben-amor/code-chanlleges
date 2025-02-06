import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserStatistics = () => {
  // Static data for User Statistics
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // months
    datasets: [
      {
        label: "Active Users",
        data: [12, 19, 3, 5, 2, 3, 7], // number of active users
        borderColor: "rgba(75, 192, 192, 1)", // line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // fill color
        tension: 0.1,
        fill: true, // fill the area under the line
      },
      {
        label: "New Signups",
        data: [5, 10, 7, 8, 3, 6, 9], // number of new signups
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Chart options (optional)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Statistics (Active Users & New Signups)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div style={{ width: "60%", margin: "auto", paddingTop: "20px" }}>
      <h2>User Statistics</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserStatistics;
