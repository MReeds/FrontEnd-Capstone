import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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
          <li>
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          {props.hasUser ? (
            <li>
              <Link className="navLink" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link className="navLink" to="/login">
                Login/Register
              </Link>
            </li>
          )}
          {props.hasUser ? (
            <li>
              <Link className="navLink" to="/verses">
                Saved
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
