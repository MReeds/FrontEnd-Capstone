import React, { useState } from "react";
import UserManager from "../../modules/UserManager";

const Login = props => {
    // sets the default value or username and email to an empty string
    const [credentials, setCredentials] = useState({
        username: "",
        email: ""
    });
    
    const [register, setRegister] = useState({
            // sets the default value or username and email to an empty string
        username: "",
        email: "",
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
        e.preventDefualt();
        let valid = true;
        UserManager.getAll().then(users => {
            users.map(user => {
                if (user.username === register.username) {
                    valid = false;
                    alert("Username is already taken")
                } if (user.email === register.email) {
                    valid = false;
                    alert("Email address is already registered")
                }
            });
            if (
                register.username === "" ||
                register.email === ""
            ) {
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
        e.preventDefualt();
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

    return (
        <>
        <form onSubmit={handleLogin}>
            <fieldset>
                <h3>Login</h3>
                <div className="formgrid">
                    <label htmlFor="inputUsername">Username: </label>
                    <input
                    onChange={handleFieldChange}
                    type="username"
                    placeholder="Username"
                    required=""
                    autoFocus=""
                    />
                    <label htmlFor="inputEmail">Email: </label>
                    <input
                    onChange={handleFieldChange}
                    type="email"
                    id="email"
                    placeholder="Email"
                    required=""
                    />
                </div>
                <button type="submit">Submit</button>
            </fieldset>
        </form>

        <form onSubmit={handleRegister}>
            <fieldset>
                <h3>Create an account</h3>
                <div className="formgrid">
                    <label htmlFor="inputUsername">Username: </label>
                    <input
                    onChange={handleRegisterFieldChange}
                    type="username"
                    id="username"
                    placeholder="Username"
                    autoFocus=""
                    />
                    <label htmlFor="InputEmail">Email: </label>
                    <input 
                    onChange={handleRegisterFieldChange}
                    type="email"
                    id="email"
                    placeholder="Email"
                    required=""
                    />
                </div>
                <button type="submit">Register</button>
            </fieldset>
        </form>
        </>
    )
}

export default Login