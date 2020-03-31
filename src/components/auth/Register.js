import React, { useState } from "react";
import UserManager from "../../modules/UserManager";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const Register = props => {
  const [register, setRegister] = useState({
    // sets the default value or username and email to an empty string
    username: "",
    email: ""
  });

  const handleRegisterFieldChange = e => {
    // When the value changes in the register it updates and sets state
    const stateToChange = { ...register };
    stateToChange[e.target.id] = e.target.value;
    setRegister(stateToChange);
  };

  const handleRegister = e => {
    // UserManager gets all users from database and maps through to check if what the user has submitted for their username or email already exists in the database. If it exists they will get an alert
    e.preventDefault();
    let valid = true;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (user.username === register.username) {
          valid = false;
          alert("Username is already taken");
        }
        if (user.email === register.email) {
          valid = false;
          alert("Email address is already registered");
        }
      });
      if (register.username === "" || register.email === "") {
        valid = false;
        alert("Please fill out all fields");
      }
      if (valid) {
        // valid is preset to truthy value. If the conditional statements above dont apply and valid is true then the user is taken to the home page and a newUser object is built from the data the user submitted and posted to the database
        const newUser = {
          username: register.username,
          email: register.email
        };
        UserManager.post(newUser)
          .then(UserManager.getAll)
          .then(users => {
            const newCredentials = {
              username: register.username,
              email: register.email
            };
            props.setUser(newCredentials, users.length);
          }).then(props.history.push(""));
      }
    });
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleRegister} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            autoFocus
            onChange={handleRegisterFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleRegisterFieldChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
              <Link href="/login" variant="body2">
                {"Go Back"}
              </Link>
            </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Register;
