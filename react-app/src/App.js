import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SideBar from "./components/SideBar";
import * as sessionActions from "./store/session"
import "./index.css"


function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(sessionActions.restore())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" >
          <NavBar />
          <SideBar />
          <MainContent>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
          </MainContent>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
