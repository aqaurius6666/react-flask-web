import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { Update } from "./Components/update";
import { About } from "./Components/about";
import Courses from "./Components/courses";
import { Grades } from "./Components/grades";
import authenticationService from "./API/authenticationService";

function App() {
    const [ ,setAccount] = useState(authenticationService.currentAccountValue)
    useEffect(() => {
        authenticationService.currentAccount.subscribe((x) => setAccount(x))
    }, [])
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={() => <Home />} />
                <Route exact path="/login" component={() => <Login />} />
                <Route exact path="/about" component={() => <About />} />
                <Route exact path="/register" component={() => <Register />} />
                <Route exact path="/courses" component={() => <Courses />} />
                <Route exact path="/update" component={() => <Update />} />
                <Route exact path="/info" component={() => <Info id={authenticationService.getId()}/>} />
                <Route exact path="/info/score" component={() => <Grades />} />

                <Route path="/info/:id" component={(props) => <Info id={props.match.params.id}/>} />
            </Switch>
        </>
    )
}

export default App;
