import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {Navbar, Nav, FormControl, Form, Button} from "react-bootstrap";
// import {Nav} from "react-bootstrap/Navbar";
// import {FormControl} from "react-bootstrap/Navbar";
// import {Form} from "react-bootstrap/Navbar";
// import {Button} from "react-bootstrap/Navbar";
import "./NavBar.css";

const NavBar = props => {
  // NavBar funciton calls the clearUser function which clears the sessionStorage credentials and pushes the user to the home screen
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };

  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <br />
      {/* <nav>
      <header>
        <h1 className="siteTitle">Reassurance</h1>
      </header>
        <ul className="navContainer">
          {props.hasUser ? (
            <li className="home">
              <Link to="/home" className="material-icons">
                home
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <Link className="logout" to="/home" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li className="bookmark">
              <Link className="material-icons" to="/verses">
                bookmarks
              </Link>
            </li>
          ) : null}
        </ul>
      </nav> */}
    </>
  );
};

export default withRouter(NavBar);
