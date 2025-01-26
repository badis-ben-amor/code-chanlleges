import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboardThunk } from "../redux/slices/leaderboardSlice";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  AccessTime,
  Leaderboard as LeaderboardIcon,
} from "@mui/icons-material";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const {
    leaderboard: leaderboardData,
    message,
    isError,
    isLoading,
  } = useSelector((state) => state.leaderboard);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    dispatch(getLeaderboardThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setLeaderboard(leaderboardData);
  }, [leaderboardData]);

  const chartData = {
    labels: leaderboard?.map((user) => user.name),
    datasets: [
      {
        label: "Points",
        data: leaderboard?.map((user) => user.points),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Container>
      <Grid spacing={4} sx={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        {/* <Grid item xs={12} sm={3} component={Paper}>
      <List>
        <ListItem>
          <ListItemIcon>
            <LeaderboardIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccessTime />
          </ListItemIcon>
          <ListItemText primary="Recent Activities" />
        </ListItem>
      </List>
    </Grid> */}

        {/* Main Content */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Leaderboard
            </Typography>

            {isLoading ? (
              <CircularProgress />
            ) : isError ? (
              <Typography color="error">
                {message || "Failed to load leaderboard."}
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {/* Leaderboard Chart */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ height: 400, p: 2 }}>
                    <Bar data={chartData} options={chartOptions} />
                  </Paper>
                </Grid>

                {/* Leaderboard Table */}
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Rank</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Points</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaderboard?.map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Leaderboard;
