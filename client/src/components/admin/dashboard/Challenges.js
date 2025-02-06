import React from "react";
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

// Register required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChallengeStats = () => {
  // Static Data for Code Challenges
  const data = {
    labels: ["Easy", "Medium", "Hard"], // Challenge difficulty levels
    datasets: [
      {
        label: "Completed Challenges",
        data: [150, 90, 40], // Number of completed challenges per difficulty level
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"], // Colors for each difficulty
        borderColor: ["#388E3C", "#F57C00", "#D32F2F"],
        borderWidth: 1,
      },
      {
        label: "Pending Challenges",
        data: [50, 70, 100], // Number of pending challenges per difficulty level
        backgroundColor: ["#81C784", "#FFCC80", "#E57373"],
        borderColor: ["#388E3C", "#F57C00", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Code Challenge Statistics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Difficulty Level",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Challenges",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "60%", margin: "auto", paddingTop: "20px" }}>
      <h2>Code Challenge Stats</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChallengeStats;
