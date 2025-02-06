import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivityThunk } from "../redux/slices/activitySlice";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";

const ActivityLogPage = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { isLoading, activity } = useSelector((state) => state.activity);
  const [activityLog, setActivityLog] = useState([]);
  useEffect(() => {
    dispatch(getActivityThunk(accessToken));
  }, [dispatch]);
  useEffect(() => {
    setActivityLog(activity);
  }, [activity]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Activity Log
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : activityLog.length === 0 ? (
        <Typography variant="body1" align="center">
          No activity to display.
        </Typography>
      ) : (
        <Card>
          <CardContent>
            <List>
              {activityLog.map((activity, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    {activity.type === "challengeCompleted" ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <EmojiEventsIcon color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.details}
                    secondary={new Date(activity.date).toLocaleDateString()}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ActivityLogPage;
