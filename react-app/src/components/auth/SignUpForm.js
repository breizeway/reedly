import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from 'react-router-dom';
import * as sessionActions from "../../store/session"

const SignUpForm = () => {
    const authenticated = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await dispatch(sessionActions.signup(username, email, password))
            if (user.errors) setErrors(user.errors);
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <h2>Sign up to Reedly</h2>
            <form onSubmit={onSignUp}>
                <div>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        className="input-top"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={updateUsername}
                        value={username}
                    />
                </div>
                <div>
                    <input
                        className="input-middle"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={updateEmail}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        className="input-middle"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={updatePassword}
                        value={password}
                    />
                </div>
                <div>
                    <input
                        className="input-bottom"
                        type="password"
                        name="repeat_password"
                        placeholder="Repeat Password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                    ></input>
                </div>
                <div>
                    <input type="submit" className="button" value="Sign up" />
                </div>
            </form>
            <div className="footer">
                <Link className="lnk" to="/login">Existing User? Login</Link>
            </div>
        </div>
    );
};

export default SignUpForm;
