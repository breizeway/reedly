import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import AddSource from "./components/AddSource"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SideBar from "./components/SideBar";
import SourceList from "./components/SourceList"
import FeedList from "./components/FeedList"
import FeedView from "./components/FeedView"
import PageNotFound from "./components/PageNotFound"
import About from "./components/About"
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
                                <Redirect to='today' />
                            </Route>
                            <Route path="/today" exact={true}>
                                <FeedView viewName='today'/>
                            </Route>
                            <Route path="/all" exact={true}>
                                <FeedView viewName='all'/>
                            </Route>
                            <Route path="/sources/add/:feedId">
                                <AddSource />
                            </Route>
                            <Route path="/sources/add">
                                <AddSource />
                            </Route>
                            <Route path="/feeds/:feedId">
                                <FeedList />
                            </Route>
                            <Route path="/sources/:id">
                                <SourceList />
                            </Route>
                            <Route path="/about">
                                <About />
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
