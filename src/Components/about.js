import React from 'react'
import Header from './header'
import Footer from "./footer";
import {Leader, trList, SubjectList} from "../data/superData";
import Loading from "./loading";
import { authenticationService } from '../API/service';
import envURL from "../data/characterImages";
import video from "../img/Hogwarts Subjects.mp4";

const findSubjectImage = (name = "Unknown") => {
    let URL = name.replace(/\s/g, '%20')
    return `${envURL}/${URL}.jpg`
}

const RenderLeader = ({ leader }) => {
    return(
        <>
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
        <hr />
        </>
    );
}
const Presidents = () => {
    const leaders = Leader
        .map((leader, i) => <RenderLeader key={i} leader={leader} />)

    return (
        <div className="container presidents">
            <h3><span className="mw-headline">II. Heads of Hogwarts</span></h3>
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
const RenderTr = ({trItem}) => {
    return (
        <thead className="row">
            <td className="col-md-2 d-none d-xl-block d-sm-inline item_title">{trItem.title}</td>
            <tr className="col-12 col-md-10 row">
                <td className="col-3 item0">{trItem.description[0]}</td>
                <td className="col-3 item1">{trItem.description[1]}</td>
                <td className="col-3 item2">{trItem.description[2]}</td>
                <td className="col-3 item3">{trItem.description[3]}</td>
            </tr>
        </thead>
    )
}
const Houses = () => {
    const trItems = trList
        .map((item, i) => <RenderTr key={i} trItem = {item}/>)
    return (
        <div className="container">
            <div>
                <div>
                    <h3><span>I. Houses of Hogwarts</span></h3>
                </div>

            </div>
            <table border="1" >
                {trItems}
            </table>
        </div>
    )
}
const RenderSubject = ({subject}) => {
    return(
        <>
            <div className="container row">
                <div className="col-12 col-md-6">
                    <img width="300px" height="auto" src={findSubjectImage(subject.name)}
                         alt={subject.name} />
                </div>
                <div className="col-12 col-md-6">
                    <header>
                        <h3>{subject.name}</h3>
                    </header>
                    <p>{subject.description}</p>
                </div>
            </div>
            <hr />
        </>
    );
}
const Subject = () => {
    const subjects = SubjectList
        .map((subject, i) => <RenderSubject key={i} subject={subject} />)

    return (
        <div className="container">
            <h3><span>III. Core Subjects</span></h3>
            <div className="row body_font">
                <div className="col-6">
                    <p>There are a variety of classes taught at Hogwarts School of Witchcraft and Wizardry.
                        These include both the core curriculum and the electives, available from third year
                        forward. In the fifth year, students take the Ordinary Wizarding Level (O.W.L.) exams
                        to determine whether they can achieve a score high enough to continue to N.E.W.T.-level
                        (Nastily Exhausting Wizarding Test) for the class in the remaining two years.
                        Some classes, including the core classes, may be dropped in sixth year.
                        Specialised classes such as Alchemy become available in sixth year provided there is
                        sufficient demand.</p>
                    <br />
                </div>
                <div className="col-1"> </div>
                <div className="col-5 video">
                    <video width="420" height="auto" controls>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>
            <hr/>
            <div className="container">
                {subjects}
            </div>
        </div>
    )
}


export const About = () => {
    const account = authenticationService.currentAccountValue()
    if (account) {
        return (
            <div className="about">
                <Header />
                <div className="body_font">
                    <br />
                    <Houses />
                    <Presidents />
                    <Subject />
                </div>
                <Footer/>
            </div>
        );
    } else {
        return <Loading />
    }
}
