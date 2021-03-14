import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { Update } from "./Components/update";
import { About } from "./Components/about";
import { authenticationService } from "./API/service";
import { loadingContext } from "./Components/loadingContext";
import Slider from "./Components/courses";
import Courses from "./Components/courses";
import Loading from "./Components/loading";
import { Grades } from "./Components/grades";
import history from "./history";

function App() {
    const [account, setAccount] = useState(authenticationService.currentAccountValue)
    const [loading, setLoading] = useState(false)
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
                <Route exact path="/info" component={() => <Info />} />
                <Route exact path="/info/score" component={() => <Grades />} />
            </Switch>
        </>
    )
}

export default App;
