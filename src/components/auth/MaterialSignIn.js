import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserManager from "../../modules/UserManager";

const MaterialLogin = props => {
  // sets the default value or username and email to an empty string
  const [credentials, setCredentials] = useState({
      username: "",
      email: ""
  });

  const handleFieldChange = e => {
      // When the value changes in the credentials it updates and sets state
      const stateToChange = { ...credentials };
      stateToChange[e.target.id] = e.target.value;
      setCredentials(stateToChange);
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
                  props.history.push("/home");
              }
          });
          if (!valid) {
              alert("Incorrect username and email combination. Please try again");
          }
      });
  };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>      
    </Container>
  );
}
export default MaterialLogin