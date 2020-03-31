import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import MaterialLogin from "./auth/MaterialSignIn";
import VerseList from "./verse/VerseList";
import VerseDetail from "./verse/VerseDetail";
import Register from "./auth/Register";

const ApplicationViews = props => {
  // passing props to AV and declaring variable names equal to the props that were passed down from Capstone.js
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  return (
    <React.Fragment>
      <Route
        path="/login"
        render={props => {
          return <MaterialLogin setUser={setUser} {...props} />;
        }}
      />
      <Route 
      path="/register"
      render={props => {
        return <Register setUser={setUser} {...props}/>
      }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return hasUser ? <Home /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/verses"
        render={props => {
          return hasUser ? <VerseList {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/verses/:verseId(\d+)"
        render={props => {
          return hasUser ? (
            <VerseDetail
              verseId={parseInt(props.match.params.verseId)}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
