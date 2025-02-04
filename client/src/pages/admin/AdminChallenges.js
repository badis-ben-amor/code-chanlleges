import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllChallengesAdminThunk,
  createOneChallengeAdminThunk,
  updateChallengeAdminThunk,
  deleteChallengeAdminThunk,
} from "../../redux/slices/admin/adminChallengeSlice";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const AdminChallenges = () => {
  const dispatch = useDispatch();
  const { challenges: challengesData } = useSelector(
    (state) => state.adminChallenge
  );
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  const [challenges, setChallenges] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  useEffect(() => {
    dispatch(fetchAllChallengesAdminThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setChallenges(challengesData);
  }, [challengesData]);

  const handleOpenDialog = (challenge) => {
    setCurrentChallenge(
      challenge
        ? JSON.parse(JSON.stringify(challenge))
        : {
            title: "",
            description: "",
            tags: [],
            options: [
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
            ],
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCurrentChallenge(null);
    setOpenDialog(false);
  };

  const handaleSave = () => {
    const correctOptions = currentChallenge.options.filter(
      (option) => option.isCorrect
    ).length;

    if (correctOptions !== 1) {
      alert("There must be exactly one correct option");
      return;
    }

    if (currentChallenge._id) {
      dispatch(
        updateChallengeAdminThunk({
          challengeId: currentChallenge._id,
          challengeData: currentChallenge,
          accessToken,
        })
      ).then(() => dispatch(fetchAllChallengesAdminThunk(accessToken)));
    } else {
      dispatch(
        createOneChallengeAdminThunk({
          challengeData: currentChallenge,
          accessToken,
        })
      ).then(() => dispatch(fetchAllChallengesAdminThunk(accessToken)));
    }
    handleCloseDialog();
  };

  const handleDelete = (challengeId) => {
    dispatch(deleteChallengeAdminThunk({ challengeId, accessToken })).then(() =>
      dispatch(fetchAllChallengesAdminThunk(accessToken))
    );
  };

  return (
    <Container className="my-3">
      {/* <Typography>Admin Challenges</Typography> */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Add Challenge
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow key={challenge._id}>
                <TableCell>{challenge.title}</TableCell>
                <TableCell>{challenge.description}</TableCell>
                <TableCell>{challenge.difficulty}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {challenge.tags?.map((tag, i) => (
                      <Chip key={i} label={tag} />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <ul>
                    {challenge.options?.map((option, i) => (
                      <li
                        key={i}
                        style={{
                          fontWeight: option.isCorrect ? "bold" : "normal",
                          color: option.isCorrect ? "white" : "inherit",
                          backgroundColor: option.isCorrect
                            ? "green"
                            : "whitesmoke",
                        }}
                      >
                        {option.isCorrect
                          ? `Option ${i + 1} True`
                          : `Option ${i + 1} False`}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(challenge)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(challenge._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          {currentChallenge?._id ? "Edit Challenge" : "Add Challenge"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={currentChallenge?.title || ""}
            onChange={(e) =>
              setCurrentChallenge((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          <TextField
            label="Description"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            value={currentChallenge?.description || ""}
            onChange={(e) =>
              setCurrentChallenge((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <TextField
            label="Difficulty"
            select
            fullWidth
            value={currentChallenge?.difficulty || ""}
            margin="normal"
            onChange={(e) =>
              setCurrentChallenge((prev) => ({
                ...prev,
                difficulty: e.target.value,
              }))
            }
          >
            {["easy", "medium", "hard"].map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Tags (comma-separated"
            fullWidth
            margin="normal"
            value={(currentChallenge?.tags || []).join(", ")}
            onChange={(e) =>
              setCurrentChallenge((prev) => ({
                ...prev,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Options
          </Typography>
          {currentChallenge?.options.map((option, index) => (
            <Grid key={index} container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  label={`Option ${index + 1}`}
                  fullWidth
                  value={option.option}
                  onChange={
                    (e) =>
                      setCurrentChallenge((prev) => {
                        const updatedOptions = [...prev.options];
                        updatedOptions[index].option = e.target.value;
                        return { ...prev, options: updatedOptions };
                      })
                    // other method to "avoiding unintended mutations"
                    // setCurrentChallenge((prev) => {
                    //   const updatedOptions = [...prev.options];
                    //   updatedOptions[index] = {
                    //     ...updatedOptions[index],
                    //     option: e.target.value,
                    //   };
                    //   return { ...prev, options: updatedOptions };
                    // });
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant={option.isCorrect ? "contained" : "outlined"}
                  color={option.isCorrect ? "success" : "primary"}
                  fullWidth
                  onClick={() =>
                    setCurrentChallenge((prev) => {
                      const updatedOptions = prev.options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index,
                      }));
                      return { ...prev, options: updatedOptions };
                    })
                  }
                >
                  {option.isCorrect ? "Correct" : "Set as Correct"}
                </Button>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handaleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminChallenges;
