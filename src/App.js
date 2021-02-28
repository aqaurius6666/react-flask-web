import React , { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
//import { api_get_account, initialAccount } from "./API/action";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { Update } from "./Components/update";
//import accountContext from "./Components/accountContext";
import { About } from "./Components/about";
import { authenticationService } from "./API/authentication";
import { loadingContext } from "./Components/loadingContext";

function App() {
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        authenticationService.currentAccount.subscribe((x) => setAccount(x))
    }, [])
    return (
        <>
            <loadingContext.Provider value={{ loading, setLoading }}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route exact path="/login" component={() => <Login />} />
                    <Route exact path="/about" component={() => <About />} />
                    <Route exact path="/register" component={() => <Register />} />
                    <Route exact path="/update" component={() => <Update />} />
                    <Route exact path="/info" component={() => <Info />} />
                </Switch>
            </loadingContext.Provider>
        </>
    )
}

export default App;