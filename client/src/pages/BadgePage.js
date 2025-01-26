import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { Lock, EmojiEvents } from "@mui/icons-material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const badges = [
  {
    name: "First Challenge",
    description: "Complete your first challenge.",
    earned: true,
  },
  { name: "Intermediate", description: "Earn 100 points.", earned: false },
  { name: "Advanced", description: "Earn 500 points.", earned: false },
  { name: "Expert", description: "Earn 1000 points.", earned: false },
];

const BadgePage = () => {
  const [badgeList, setBadgeList] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Unlocked", "Locked"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4caf50", "#d3d3d3"],
      },
    ],
  });

  useEffect(() => {
    // Load badge data (assume from API or state).
    setBadgeList(badges);

    // Update chart data based on badge status
    const unlocked = badges.filter((b) => b.earned).length;
    const locked = badges.length - unlocked;
    setChartData((prev) => ({
      ...prev,
      datasets: [{ ...prev.datasets[0], data: [unlocked, locked] }],
    }));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Your Badges
      </Typography>

      <Grid container spacing={3}>
        {/* Display badges */}
        {badgeList.map((badge, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                backgroundColor: badge.earned ? "white" : "#f0f0f0",
                border: badge.earned
                  ? "2px solid #4caf50"
                  : "2px dashed #d3d3d3",
                transition: "transform 0.3s",
                transform: badge.earned ? "scale(1.05)" : "scale(1)",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    margin: "auto",
                    backgroundColor: badge.earned ? "#4caf50" : "#d3d3d3",
                    mb: 2,
                  }}
                >
                  {badge.earned ? <EmojiEvents /> : <Lock />}
                </Avatar>
                <Typography variant="h6">{badge.name}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    textDecoration: badge.earned ? "none" : "none",
                    color: badge.earned ? "success.main" : "text.secondary",
                  }}
                >
                  {badge.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" align="center" mt={5}>
        Progress Overview
      </Typography>
      <div style={{ maxWidth: 300, margin: "auto" }}>
        <Doughnut data={chartData} />
      </div>
    </Container>
  );
};

export default BadgePage;
