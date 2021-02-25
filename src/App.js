import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { api_get_account, initialAccount } from "./API/action";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { Update } from "./Components/update";
import accountContext from "./Components/accountContext";
import {About} from "./Components/about";

function App() {
    const [account, setAccount] = useState(initialAccount())
    useEffect(() => {
        api_get_account((account) => setAccount(account))
    } ,[])

    return (
        <>
            <accountContext.Provider value = {{account, setAccount}}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={() => <Home/>} />
                    <Route exact path="/login" component={() => <Login/>} />
                    <Route exact path="/about" component={() => <About/>} />
                    <Route exact path="/register" component={() => <Register/>} />
                    <Route exact path="/update" component={() => <Update/>} />
                    <Route exact path="/info" component={() => <Info/>} />
                </Switch>
            </accountContext.Provider>
        </>
    )
}

export default App;
