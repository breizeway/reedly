import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session"
import './UpForms.css'

const LoginForm = () => {
    const authenticated = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleDemoSubmit = async (e) => {
        e.preventDefault();

        await dispatch(sessionActions.login("kevin@dundermifflin.com", 'password'))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await dispatch(sessionActions.login(email, password))
        if (user.errors) setErrors(user.errors);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <h2>Login to Reedly</h2>
            <form onSubmit={onLogin}>
                <div>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        className="input-top"
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div>
                    <input
                        className="input-bottom"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <div>
                    <input type="submit" className="button" value="Login" />
                    <input type="submit" className="button" value="Demo User" onClick={handleDemoSubmit}/>
                </div>
            </form>
            <div className="footer">
                <Link className="lnk" to="/sign-up">New User? Sign up</Link>
            </div>
        </div>
    );
};

export default LoginForm;
