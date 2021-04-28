import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { Route, Switch, useLocation } from "react-router-dom";
import AddSource from "./components/AddSource"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList"
import FeedList from "./components/FeedList"
import HomePage from "./components/HomePage"
import PageNotFound from "./components/PageNotFound"
import * as sessionActions from "./store/session"
import "./index.css"


function App() {
    const path = useLocation().pathname
    const isForm = path === "/login" || path === "/sign-up"
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(sessionActions.restore())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <div className="app-container" style={{ display: isForm && "flex"}}>
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path="/">
                    <NavBar />
                    <SideBar />
                    <MainContent>
                        <Switch>
                            <Route path="/" exact={true}>
                                <HomePage />
                            </Route>
                            <Route path="/sources/add" exact={true}>
                                <AddSource />
                            </Route>
                            <Route path="/feeds/:feedId">
                                <FeedList />
                            </Route>
                            <Route path="/sources/:id">
                                <ArticleList />
                            </Route>
                            <Route path="/*" >
                                <PageNotFound />
                            </Route>
                        </Switch>
                    </MainContent>
                </ProtectedRoute>
            </Switch>
        </div>
    );
}

export default App;
