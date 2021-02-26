import {Jumbotron} from "react-bootstrap";
import React from "react";

const Header = () => {
    return (
        <Jumbotron className="headerComponent">
            <div className="row container">
                <div className="col-12 col-md-6">
                    <h2>WELCOME TO HOGWARTS</h2>
                    <blockquote>
                        Welcome to Hogwarts. I hope you have a great time here.
                    </blockquote>
                    <p>
                        - Albus Dumbledore -
                    </p>
                </div>
            </div>
        </Jumbotron>
    )
}

export default Header;