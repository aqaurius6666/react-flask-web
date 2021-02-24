import React, {useContext} from 'react'
import Gryffindor from "../img/Gryffindor.png"
import Hufflepuff from "../img/Hufflepuff.png"
import Slytherin from "../img/Slytherin.png"
import Ravenclaw from "../img/Ravenclaw.png"
import hogwart from "../img/hogwarts_school.jpg"
import albus_dumbledore from "../img/albus_dumbledore.jpg"
import minerva_mcgonagall from "../img/minerva_mcgonagall.jpg"
import flitwick from "../img/flitwick.png"
import severus_snape from "../img/severus_snape.jpg"
import NavBar from "./nav-bar";
import userContext from "./userContext";
import Footer from "./footer";
import {Media} from 'react-bootstrap'

const Leader = [
    {
        name: 'Professor Albus Dumbledore',
        description: 'Albus Dumbledore was never proud or vain; he could find something to value in anyone, however apparently insignificant or wretched, and I believe that his early losses endowed him with great humanity and sympathy. I shall miss his friendship more than I can say, but my loss is as nothing compared to the Wizarding world’s. That he was the most inspiring and the best loved of all Hogwarts headmasters cannot be in question. He died as he lived: working always for the greater good and, to his last hour, as willing to stretch out a hand to a small boy with dragon pox as he was on the day that I met him.',
        image: albus_dumbledore
    },
    {
        name: 'Professor Minerva McGonagall',
        description: 'Professor Minerva McGonagall is the Transfiguration teacher at Hogwarts, head of Gryffindor house and deputy headmistress of Hogwarts during Harry\'s first year. She is described as fair, but very strict. Amongst other things, she led Harry to his sorting in his first year. She has the ability to transform into a tabby cat, because she is animaugus.',
        image: minerva_mcgonagall
    },
    {
        name: 'Professor Filius Flitwick',
        description: 'Professor Filius Flitwick was the Charms master and head of Ravenclaw house during Harry\'s first year at Hogwarts. He is described as "the best and most knowledgable Charms master alive in the world today." He has a remarkably short stature - Rowling has stated that he has "a dash of goblin blood.',
        image: flitwick
    },
    {
        name: 'Professor Severus Snape',
        description: 'Professor Severus Snape is the Potions master and head of Slytherin house, and is seen as the main secondary antagonist up until the end of the first book. His most notable appearance is during Chapter 8, which is named after him ("The Potions Master"). He teaches in the dungeons\' Potions Classroom.',
        image: severus_snape
    }
]

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
};

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
        <div className="container">
            <h3><span className="mw-headline" id="Heads_of_Hogwarts">Heads of Hogwarts</span></h3>
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
            <table className="simple" border="1" >
                <tbody>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">Name/Crest
                    </th>
                    <div className="col-11 row">
                        <th className="col-3"><a title="Gryffindor">Gryffindor</a><img alt="Gryffindor" src={Gryffindor} />
                        </th>
                        <th className="col-3"><a title="Hufflepuff">Hufflepuff</a><img alt="Hufflepuff" src={Hufflepuff} />
                        </th>
                        <th className="col-3"><a title="Ravenclaw">Ravenclaw</a><img alt="Ravenclaw" src={Ravenclaw} />
                        </th>
                        <th className="col-3"><a title="Slytherin">Slytherin</a><img alt="Slytherin" src={Slytherin} />
                        </th>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">Founded By
                    </th>
                    <div className="col-11 row">
                        <td className="col-3"><a  title="Godric Gryffindor">Godric Gryffindor</a>
                        </td>
                        <td className="col-3"><a  title="Helga Hufflepuff">Helga Hufflepuff</a>
                        </td>
                        <td className="col-3"><a  title="Rowena Ravenclaw">Rowena Ravenclaw</a>
                        </td>
                        <td className="col-3"><a  title="Salazar Slytherin">Salazar Slytherin</a>
                        </td>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">House Ghost
                    </th>
                    <div className="col-11 row">
                        <td className="col-3"><a  title="Nicholas de Mimsy-Porpington">Nearly
                            Headless Nick</a>
                        </td>
                        <td className="col-3"><a  title="Fat Friar">Fat Friar</a>
                        </td>
                        <td className="col-3">The <a  title="Helena Ravenclaw">Grey Lady</a>
                        </td>
                        <td className="col-3">The <a  title="Bloody Baron">Bloody Baron</a>
                        </td>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">House symbol
                    </th>
                    <div className="col-11 row">
                        <td className="col-3"><a  title="Lion">Lion</a>
                        </td>
                        <td className="col-3"><a  title="Badger">Badger</a>
                        </td>
                        <td className="col-3"><a  title="Eagle">Eagle</a>
                        </td>
                        <td className="col-3"><a  title="Snake">Serpent</a>
                        </td>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">House colours
                    </th>
                    <div className="col-11 row">
                        <td className="col-3">Deep red and gold
                        </td>
                        <td className="col-3">Yellow and black
                        </td>
                        <td className="col-3">Blue and bronze
                        </td>
                        <td className="col-3">Green and silver
                        </td>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">Description
                    </th>
                    <div className="col-11 row">
                        <td className="col-3">Well known for courage, bravery, daring, nerve, and chivalry.
                        </td>
                        <td className="col-3">Well known for loyalty, patience, hard work, fair-play, honesty, and tolerance.
                        </td>
                        <td className="col-3">Values intelligence, wit, cleverness, creativity, and wisdom.
                        </td>
                        <td className="col-3">Values ambition, leadership, cunning, determination, and resourcefulness.
                        </td>
                    </div>
                </tr>
                <tr className="row">
                    <th className="col-1 d-none d-sm-inline">Common room
                    </th>
                    <div className="col-11 row">
                        <td className="col-3">The entrance to the common room was on the seventh floor hidden behind a portrait of the <a
                            title="Fat Lady">Fat Lady</a>. To enter, the correct password must be
                            provided.
                        </td>
                        <td className="col-3">Located near the kitchens. To enter, one must tap a fake barrel in the rhythm "<a
                             title="Helga Hufflepuff">Helga Hufflepuff</a>." It was the only
                            common room to have a way to keep students from other houses out (by dumping vinegar on them).
                        </td>
                        <td className="col-3">Located in a high tower, and the interior was decorated with blue and bronze. To enter, one must
                            answer a riddle from an eagle door knocker.
                        </td>
                        <td className="col-3">Located in the dungeons, underneath the Black Lake, and hidden behind a stone wall. To enter,
                            the correct password must be provided.
                        </td>
                    </div>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export const About = () => {
    const {user} = useContext(userContext)
    if (user) {
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
