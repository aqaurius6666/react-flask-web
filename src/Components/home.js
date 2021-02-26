import { useContext} from "react"
import React from 'react'
import logo from "../img/hogwarts_sm_logo.svg"
import hogwart from "../img/four_houses.jpg"
import NavBar from "./nav-bar";
import Footer from "./footer";
import accountContext from "./accountContext"
import {NotificationList} from "../data/superData"
import Header from "./header";

const MediaComponent = (props) => {
    let media = props.media
    return (
        <div className="media">
            <div className="pull-left">
                <a className="logo" href={media.link}>
                    <img alt="logo" width="64" height="64" src={logo} />
                </a>
            </div>

            <div className="media-body">
                <h4 className="media-heading" >
                    <a href={media.link}>
                        {media.alert}
                    </a>
                </h4>
                <span className="date-alert"><i className="fa fa-clock-o" aria-hidden="true"> </i> {media.date}</span>
            </div>
        </div>
    )
}

const Introductory = () => {
    return (
        <header className="jumbotron">
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-8">
                        <h1>Hogwarts School of<br/>Witchcraft and Wizardry!</h1>
                        <p className="font_medium">Hogwarts is divided into four houses, each bearing the last name of its founder:
                            Godric Gryffindor, Salazar Slytherin, Rowena Ravenclaw and Helga Hufflepuff.
                            Throughout the school year, the houses compete for the House Cup, gaining and losing
                            points based on actions such as performance in class and rule violations. The house with
                            the highest end-of-year total wins and has its colours displayed in the Great Hall for the
                            following school year. Each house also has its own Quidditch team that competes for the
                            Quidditch Cup. These two competitions breed rivalries between the houses. Houses at Hogwarts
                            are living and learning communities for their students. Each house is under the authority
                            of one of the Hogwarts staff members. The Heads of the houses, as they are called, are in
                            charge of giving their students important information, dealing with matters of severe
                            punishment, and responding to emergencies in their houses, among other things. Each year,
                            year level groups of every separate house share the same dormitory and classes. The dormitory
                            and common room of a House are, barring rare exceptions, inaccessible to students belonging
                            to other Houses.</p>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <img alt="logo" width="auto" height="400px" src={hogwart} />
                    </div>
                </div>
            </div>
        </header>
    )
}

const Notification = () => {

    return (
        <div id="notification">
            <div className="row">
                <div className="col-md">
                    <div className="col1-1">
                        <div className="box-header">
                            <h4>&nbsp;&nbsp;&nbsp;<i className="fa fa-bell" aria-hidden="true" />&nbsp;&nbsp;Tin tức mới nhất</h4>
                        </div>

                        <div className="news" id="TinMoiNhat">
                            <div className="row">
                                <div className="mediaList col-md-6">
                                    <MediaComponent media={NotificationList[0]} />
                                    <MediaComponent media={NotificationList[1]} />
                                    <MediaComponent media={NotificationList[2]} />
                                    <MediaComponent media={NotificationList[0]} />
                                    <MediaComponent media={NotificationList[1]} />
                                    <MediaComponent media={NotificationList[2]} />
                                </div>
                                <div className="mediaList col-md-6">
                                    <MediaComponent media={NotificationList[3]} />
                                    <MediaComponent media={NotificationList[4]} />
                                    <MediaComponent media={NotificationList[5]} />
                                    <MediaComponent media={NotificationList[3]} />
                                    <MediaComponent media={NotificationList[4]} />
                                    <MediaComponent media={NotificationList[5]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Home = () => {
    const {account} = useContext(accountContext)
    if (account) {
        return (
            <div className="home">
                <NavBar/>
                <Header/>
                <Introductory />
                <hr className="hr"/>
                <Notification/>
                <Footer/>
            </div>
        );
    } else {
        return (
            <div>You are not log in!</div>
        )
    }
}

