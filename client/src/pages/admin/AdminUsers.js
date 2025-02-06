import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserAdminThunk,
  getOneUserAdminThunk,
  createUserAdminThunk,
  updateUserAdminThunk,
  deleteUserAdminThunk,
} from "../../redux/slices/admin/adminUserSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.adminUser);
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  const [allUsers, setAllUsers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    dispatch(getAllUserAdminThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user);
    setForm(user || { name: "", email: "", role: "user", password: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (openDialog === false) {
      setCurrentUser(null);
    }
  };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setCurrentUser(null);
  //   console.log(currentUser)
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (currentUser) {
      dispatch(
        updateUserAdminThunk({
          userData: { ...form },
          userId: currentUser._id,
          accessToken,
        })
      ).then(() => dispatch(getAllUserAdminThunk(accessToken)));
    } else {
      dispatch(createUserAdminThunk({ userData: form, accessToken })).then(() =>
        dispatch(getAllUserAdminThunk(accessToken))
      );
    }
    handleCloseDialog();
  };

  const handleDelete = (userId) => {
    dispatch(deleteUserAdminThunk({ userId, accessToken }));
  };

  return (
    <Container className="my-1">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box p={3}>
            {/* <Typography variant="h4" gutterBottom>
              Admin Users
            </Typography> */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mb: 2 }}
            >
              Add User
            </Button>
            <List>
              {allUsers.map((user) => (
                <Accordion
                  expanded={expanded === user._id}
                  onChange={() =>
                    setExpanded(expanded === user._id ? null : user._id)
                  }
                  key={user._id}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{user.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Role: {user.role}</Typography>
                    <Box mt={2}>
                      <IconButton
                        onClick={() => handleOpenDialog(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>
                {currentUser ? "Edit User" : "Add User"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  margin="dense"
                />
                {currentUser ? null : (
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    margin="dense"
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminUsers;
