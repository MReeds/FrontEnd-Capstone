import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import UserManager from "../../modules/UserManager";
import Register from "./Login";

const MaterialLogin = props => {
  // sets the default value or username and email to an empty string
  const [isRegister, setIsRegister] = useState(false);

  const onClickHandler = () => {
    setIsRegister(!isRegister);
  };

  const [credentials, setCredentials] = useState({
    username: "",
    email: ""
  });

  const [register, setRegister] = useState({
    // sets the default value or username and email to an empty string
    username: "",
    email: ""
  });

  const handleFieldChange = e => {
    // When the value changes in the credentials it updates and sets state
    const stateToChange = { ...credentials };
    stateToChange[e.target.id] = e.target.value;
    setCredentials(stateToChange);
  };

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
        props.history.push("/");
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
          });
      }
    });
  };

  const handleLogin = e => {
    // UserManager gets all users and maps through them to check if what the user input for username and email combination matches what is stored in the database. If so then they are directed to the home page. If not they are alerted that it is an incorrect combination
    e.preventDefault();
    let valid = false;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (
          user.username === credentials.username &&
          user.email === credentials.email
        ) {
          valid = true;
          props.setUser(credentials, user.id);
          props.history.push("/");
        }
      });
      if (!valid) {
        alert("Incorrect username and email combination. Please try again");
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
          Sign in
        </Typography>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
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
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleFieldChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={onClickHandler} href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              {isRegister ? (
                <Register
                  handleRegister={handleRegister}
                  handleRegisterFieldChange={handleRegisterFieldChange}
                />
              ) : null}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};
export default MaterialLogin;
