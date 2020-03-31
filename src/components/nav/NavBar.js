import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  // NavBar funciton calls the clearUser function which clears the sessionStorage credentials and pushes the user to the home screen
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };

  return (
    <header>
      <h1 className="siteTitle">Reassurance</h1>
      <nav>
        <ul className="navContainer">
          {props.hasUser ? (
            <li>
              <Link to="/home" className="material-icons">
                home
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <Link className="navLink" to="/home" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <Link className="material-icons" to="/verses">
                bookmarks
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
