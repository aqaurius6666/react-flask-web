import giphy from "../img/giphy.gif";
import fh from "../img/cat.gif";
import React from "react";

const Loading = () => {
    return (
        <div className="container">
            <div className="login-padding" />
            <img src={giphy} alt="logo" width="50%" height="auto"/>
            <img src={fh} alt="fh" width="40%" height="auto" />
        </div>
    )
}

export default Loading
