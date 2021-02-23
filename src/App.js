import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { api_get_user, initialUser } from "./API/action";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { Update } from "./Components/update";
import userContext from "./Components/userContext";
<<<<<<< HEAD
import { About } from "./Components/about";
=======
import {About} from "./Components/about";

>>>>>>> 803e569a91508caaa0b3c1c89d4e2c9226e6f026
function App() {
    const [user, setUser] = useState(initialUser())
    const [user_, setUser_] = useState(initialUser())
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"))

    useEffect(() => {
<<<<<<< HEAD
        api_get_user(({ user }) => {
            console.log(user)
            setUser_(user)
            setIsLogin(localStorage.getItem("isLogin"))
            console.log(isLogin)
=======
        api_get_user((data) => {
            if (data !== user_) {
                setUser_(data)
            }
>>>>>>> 803e569a91508caaa0b3c1c89d4e2c9226e6f026
        })
    }, [])
    useEffect(() => {
<<<<<<< HEAD
        setUser(user_)
    }, [isLogin])
=======
        console.log(user)
        api_get_user((data) => {
            if (data !== user_) {
                setUser(data)
            }
        })

    }, [user_])

>>>>>>> 803e569a91508caaa0b3c1c89d4e2c9226e6f026
    return (
        <>
            <userContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route exact path="/login" component={() => <Login />} />
                    <Route exact path="/about" component={() => <About />} />
                    <Route exact path="/register" component={() => <Register />} />
                    <Route exact path="/update" component={() => <Update />} />
                    <Route exact path="/info" component={() => <Info />} />
                </Switch>
            </userContext.Provider>
        </>
    )
}

export default App;
