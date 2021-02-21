import React, {useEffect, useState} from 'react'
import {getUsers, logout} from '../FetchAPI/action'
import {useHistory, Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/styles.css"
import Gryffindor from "../img/Gryffindor.png"
import Hufflepuff from "../img/Hufflepuff.png"
import Slytherin from "../img/Slytherin.png"
import Ravenclaw from "../img/Ravenclaw.png"
import hogwart from "../img/hogwarts_school.jpg"
import {NavBar} from "../Components/NavBar";

const Presidents = () => {
    return (
        <div>
            <h3><span className="mw-headline" id="Heads_of_Hogwarts">Heads of Hogwarts</span></h3>
            <dd>
                <div className="noprint"><p>Main article:
                    <a href="https://harrypotter.fandom.com/wiki/Hogwarts_Headmaster" title="Hogwarts Headmaster">Hogwarts
                    Headmaster</a>
                </p>
                </div>
                The Headmaster or Headmistress was the chief administrator of the School. They made all major decisions
                regarding the safety and the day-to-day functioning of the school, and had the power to override any
                decision made by any other authoritative facilitator at the school, with the possible exception of the Board
                of Governors.
            </dd>
        </div>
    )
}

const Houses = () => {
    return (
        <div>
            <div className="row">
                <div className="col col-md-6">
                    <p className="house_title"><strong>Hogwarts Houses</strong></p>
                </div>
                <div className="col col-md-6">
                    <img alt="hogwart" src={hogwart} width="400px" height="auto" />
                </div>
            </div>
            <table className="simple" border="1" cellPadding="5" cellSpacing="0">
                <tbody>
                <tr>
                    <th>Name/Crest
                    </th>
                    <th><a title="Gryffindor">Gryffindor</a><img alt="Gryffindor" src={Gryffindor} />
                    </th>
                    <th><a title="Hufflepuff">Hufflepuff</a><img alt="Hufflepuff" src={Hufflepuff} />
                    </th>
                    <th><a title="Ravenclaw">Ravenclaw</a><img alt="Ravenclaw" src={Ravenclaw} />
                    </th>
                    <th><a title="Slytherin">Slytherin</a><img alt="Slytherin" src={Slytherin} />
                    </th>
                </tr>
                <tr>
                    <th>Founded By
                    </th>
                    <td><a  title="Godric Gryffindor">Godric Gryffindor</a>
                    </td>
                    <td><a  title="Helga Hufflepuff">Helga Hufflepuff</a>
                    </td>
                    <td><a  title="Rowena Ravenclaw">Rowena Ravenclaw</a>
                    </td>
                    <td><a  title="Salazar Slytherin">Salazar Slytherin</a>
                    </td>
                </tr>
                <tr>
                    <th>House Ghost
                    </th>
                    <td><a  title="Nicholas de Mimsy-Porpington">Nearly
                        Headless Nick</a>
                    </td>
                    <td><a  title="Fat Friar">Fat Friar</a>
                    </td>
                    <td>The <a  title="Helena Ravenclaw">Grey Lady</a>
                    </td>
                    <td>The <a  title="Bloody Baron">Bloody Baron</a>
                    </td>
                </tr>
                <tr>
                    <th>House symbol
                    </th>
                    <td><a  title="Lion">Lion</a>
                    </td>
                    <td><a  title="Badger">Badger</a>
                    </td>
                    <td><a  title="Eagle">Eagle</a>
                    </td>
                    <td><a  title="Snake">Serpent</a>
                    </td>
                </tr>
                <tr>
                    <th>House colours
                    </th>
                    <td>Deep red and gold
                    </td>
                    <td>Yellow and black
                    </td>
                    <td>Blue and bronze
                    </td>
                    <td>Green and silver
                    </td>
                </tr>
                <tr>
                    <th>Description
                    </th>
                    <td>Well known for courage, bravery, daring, nerve, and chivalry.
                    </td>
                    <td>Well known for loyalty, patience, hard work, fair-play, honesty, and tolerance.
                    </td>
                    <td>Values intelligence, wit, cleverness, creativity, and wisdom.
                    </td>
                    <td>Values ambition, leadership, cunning, determination, and resourcefulness.
                    </td>
                </tr>
                <tr>
                    <th>Common room
                    </th>
                    <td>The entrance to the common room was on the seventh floor hidden behind a portrait of the <a
                        title="Fat Lady">Fat Lady</a>. To enter, the correct password must be
                        provided.
                    </td>
                    <td>Located near the kitchens. To enter, one must tap a fake barrel in the rhythm "<a
                         title="Helga Hufflepuff">Helga Hufflepuff</a>." It was the only
                        common room to have a way to keep students from other houses out (by dumping vinegar on them).
                    </td>
                    <td>Located in a high tower, and the interior was decorated with blue and bronze. To enter, one must
                        answer a riddle from an eagle door knocker.
                    </td>
                    <td>Located in the dungeons, underneath the Black Lake, and hidden behind a stone wall. To enter,
                        the correct password must be provided.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export const About = () => {
    const history = useHistory();
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers().then(data => setUsers(data.users))
    }, [])
    const handleLogout = (event) => {
        logout()
        history.push("/login")
    }
    return (
        <div className="about">
            <NavBar />
            <br />
            <Houses />
            <Presidents />
        </div>
    );
}
