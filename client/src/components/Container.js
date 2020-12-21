import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MainPage from "./main/MainPage";
import ContextAuthProvider from "../context/ContextAuth";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

const Container = () => {

    return (
        <Router>
            <ContextAuthProvider>
                <Switch>
                    <Route path='/login'><LoginPage/></Route>
                    <Route path='/registration'><RegistrationPage/></Route>
                    <Route path='/test'><h1>Test</h1></Route>
                    <Route path='/'><MainPage/></Route>
                </Switch>
            </ContextAuthProvider>
        </Router>
    );

}

export default Container;