import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./auth/Login";
import VerseList from "./verse/VerseList"
import VerseForm from "./verse/VerseAddForm";

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
            <Route 
            path="/verses"
            render={props => {
                return hasUser ? (
                    <VerseList {...props} /> 
                ) : <Redirect to="/login"/>
            }}
            />
            <Route
            exact path="/verses/new"
            render={props => {
                return hasUser ? (
                    <VerseForm {...props}/>
                ) : <Redirect to="/login"/>
            }}
            />
        </React.Fragment>
    )
}

export default ApplicationViews