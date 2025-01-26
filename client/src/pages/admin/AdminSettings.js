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
import { Card, CardContent, Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminSettings = () => {
  // const users = [
  //   { id: 5565454556, name: "name 1" },
  //   { id: 5565454556, name: "name 2" },
  //   { id: 5565454556, name: "name 3" },
  //   { id: 5565454556, name: "name 4" },
  //   { id: 5565454556, name: "name 5" },
  //   { id: 5565454556, name: "name 6" },
  // ];

  const data = {
    Admin: 5,
    User: 150,
    Guest: 20,
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "User Distribution",
        data: Object.values(data),
        backgroundColor: ["#3f51b5", "#ff5722", "#4caf50", "#ffc107"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Distribution by Role",
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <Bar data={chartData} options={options} />
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
