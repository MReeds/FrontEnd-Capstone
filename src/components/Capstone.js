import React, { useState } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import { CssBaseline } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';


const Capstone = () => {
    // isAuthenticated is a function name that gets the credentials from session storage so long as it isnt a null value
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const setUser = (user, id) => {
        sessionStorage.setItem("credentials", JSON.stringify(user));
        sessionStorage.setItem("id", id)
        setHasUser(isAuthenticated());
    }
    // clearUser function clears sessionStorage and sets hasUser back to empty credentials/falsey value
    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
    }

    return (
        // This return statement passes the hasUser, clearUser and setUser down to the child components as props
        <>
        <CssBaseline/>
        <NavBar hasUser={hasUser} clearUser={clearUser} />
        <ApplicationViews hasUser={hasUser} setUser={setUser}/>
        </>
    )
}

export default Capstone