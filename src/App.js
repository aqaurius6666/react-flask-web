
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { api_get_user } from "./API/action";
import { AuthenticationApp } from "./Components/authentication";
import { Home } from "./Components/home";
import { Info } from "./Components/info";
import { Login } from "./Components/login";
import NavBar from "./Components/nav-bar";
import { Register } from "./Components/register";
import { UnauthenticationApp } from "./Components/unauthentication";
import { Update } from "./Components/update";
import userContext from "./Components/userContext";

function App() {
  const [user, setUser] = useState()
  let isFetched = false
  useEffect(() => {
    api_get_user(
      (data) => {
        console.log(data)
        setUser(data)
        isFetched = true
      })
  }, [])
  return (
      <>
      <userContext.Provider value = {{user, setUser}}>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={() => <Home/>}></Route>
        <Route exact path="/login" component={() => <Login/>}></Route>
        <Route exact path="/register" component={() => <Register/>}></Route>
        <Route exact path="/update" component={() => <Update/>}></Route>
        <Route exact path="/info" component={() => <Info/>}></Route>
      </Switch>
      </userContext.Provider>

      
      </>
  )
}

export default App;
