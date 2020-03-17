import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./auth/Login";

const ApplicationViews = props => {
    // passing props to AV and declaring variable names equal to the props that were passed down from Capstone.js
    const setUser = props.setUser;
    const hasUser = props.hasUser;

    return (
        <React.Fragment>
            <Route 
            path="/login"
            render={props => {
                return <Login setUser={setUser} { ...props}/>;
            }}
            />
            <Route
            exact path="/"
            render={props => {
                return <Home />
            }}
            />
        </React.Fragment>
    )
}

export default ApplicationViews