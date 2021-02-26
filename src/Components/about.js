import React, {useContext} from 'react'
import hogwart from "../img/hogwarts_school.jpg"
import NavBar from "./nav-bar";
import Footer from "./footer";
import accountContext from './accountContext'
import {Leader, trList} from "../data/superData";

const RenderLeader = ({ leader }) => {
    return(
        <div className="container row">
            <div className="col-12 col-md-6">
                <img width="300px" height="auto" src={leader.image} alt={leader.name} />
            </div>
            <div className="col-12 col-md-6">
                <header>
                    <h3>{leader.name}</h3>
                </header>
                <p>{leader.description}</p>
            </div>
        </div>
    );
}
const RenderTr = ({trItem}) => {
    return (
        <tr className="row">
            <th className="col-md-1 d-none d-xl-block d-sm-inline">{trItem.title}</th>
            <div className="col-12 col-md-11 row">
                <td className="col-3">{trItem.description[0]}</td>
                <td className="col-3">{trItem.description[1]}</td>
                <td className="col-3">{trItem.description[2]}</td>
                <td className="col-3">{trItem.description[3]}</td>
            </div>
        </tr>
    )
}
const Presidents = () => {
    const leaders = Leader.map((leader) => {
        return (
            <>
                <RenderLeader leader={leader} />
                <hr />
            </>

        );
    });

    return (
        <div className="container presidents">
            <h3><span className="mw-headline">Heads of Hogwarts</span></h3>
            <dd>
                <div className="noprint"><p>Main article:
                    <a href="https://harrypotter.fandom.com/wiki/Hogwarts_Headmaster" title="Hogwarts Headmaster">Hogwarts
                    Headmaster</a>
                </p>
                </div>
                <p>The Headmaster or Headmistress was the chief administrator of the School. They made all major decisions
                regarding the safety and the day-to-day functioning of the school, and had the power to override any
                decision made by any other authoritative facilitator at the school, with the possible exception of the Board
                    of Governors.</p> <br/>
                <div className="container">
                    {leaders}
                </div>
            </dd>
        </div>
    )
}

const Houses = () => {
    const trItems = trList.map((item) => {
        return (
            <>
                <RenderTr trItem = {item}/>
            </>
        )
    })

    return (
        <div>
            <div className="row">
                <div className="col col-md-6">
                    <p className="house_title"><strong>Hogwarts Houses</strong></p>
                </div>
                <div className="col col-md-6">
                    <img alt="hogwart" src={hogwart} width="60%" height="auto" />
                </div>
            </div>
            <table className="simple" border="1" >
                <tbody>
                {trItems}
                </tbody>
            </table>
        </div>
    )
}

export const About = () => {
    const {account} = useContext(accountContext)
    if (account) {
        return (
            <div className="about">
                <NavBar />
                <br />
                <Houses />
                <Presidents />
                <Footer/>
            </div>
        );
    } else {
        return (
            <div>You are not log in!</div>
        )
    }
}
