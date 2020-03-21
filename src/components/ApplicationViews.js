import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./auth/Login";
import VerseList from "./verse/VerseList";
import VerseDetail from "./verse/VerseDetail";

const ApplicationViews = props => {
  // passing props to AV and declaring variable names equal to the props that were passed down from Capstone.js
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  return (
    <React.Fragment>
      <Route
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/"
        render={props => {
          return <Home />;
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
      {/* <Route
        path="/verses/:verseId(\d+)"
        render={props => {
          return hasUser ? (
            <VerseEditForm {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      /> */}
    </React.Fragment>
  );
};

export default ApplicationViews;
