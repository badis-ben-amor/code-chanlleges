import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import datalabels plugin

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const Leaderboard = () => {
  // Static data of users with points
  const users = [
    { name: "User", points: 555 },
    { name: "User 1", points: 300 },
    { name: "User 2", points: 190 },
    { name: "User 3", points: 100 },
    { name: "User 4", points: 70 },
    { name: "User 5", points: 60 },
    { name: "User 5", points: 50 },
    { name: "User 4", points: 40 },
    { name: "User 5", points: 30 },
    { name: "User 5", points: 20 },
    { name: "User 5", points: 2 },
  ];

  // Prepare chart data
  const chartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Points",
        data: users.map((user) => user.points),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // Chart options for horizontal bars
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y", // Makes the bars horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        anchor: "end", // Position the label at the end of the bar
        align: "end", // Align the label to the right
        color: "black", // Set the label color
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h3>Leaderboard</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Leaderboard;
