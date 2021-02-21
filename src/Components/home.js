import { useContext} from "react"
import userContext from "./userContext"
import React from 'react'
import logo from "../img/hogwarts_sm_logo.svg"
import hogwart from "../img/hogwarts_school.jpg"
import NavBar from "./nav-bar";

const NotificationList = [
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2020/11/DS-SV-ho%C3%A3n-n%E1%BB%99p-h%E1%BB%8Dc-ph%C3%AD.pdf",
        alert: "Danh sách sinh viên được hoãn nộp học phí kì I (2020-2021)",
        date: "08/ 09/ 2020"
    },
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2020/11/DANH-SACH-THU-K1.20-21-TT23-1.pdf",
        alert: "DANH SÁCH CHƯƠNG TRÌNH ĐÀO TẠO CLC 2020-2021",
        date: "29/ 06/ 2020"
    },
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2021/01/Danh-s%C3%A1ch-SV-4.pdf",
        alert: "Triệu tập sinh viên tham dự Hội thảo giới thiệu chương trình MB MAGIC CUP",
        date: "28/ 06/ 2020"
    },
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2021/01/2021_1_Ket-qua-Quy-gui_Danh-s%C3%A1ch-nh%E1%BA%ADn-HB.pdf",
        alert: "Sinh viên nhận học bổng Kumho Asiana học kỳ 1, năm học 2020-2021",
        date: "15/ 05/ 2020"
    },
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2021/01/Thong-bao-so-1-Olympic-vat-ly-2021.pdf",
        alert: "Sinh viên đăng ký thi chọn đội tuyển Quidditch sinh viên toàn quốc lần thứ XXIII năm 2021",
        date: "07/ 05/ 2020"
    },
    {
        link: "https://uet.vnu.edu.vn/wp-content/uploads/2021/01/2021_1_Ket-qua-Quy-gui_Danh-s%C3%A1ch-nh%E1%BA%ADn-HB.pdf",
        alert: "Danh sách sinh viên đăng kí thi chọn đội tuyển Olympic Pháp Thuật toàn quốc lần thứ XX năm 2021",
        date: "08/ 09/ 2020"
    }
]

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
                <span className="date-alert">{media.date}</span>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <header className="jumbotron">
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Hogwarts School of Witchcraft and Wizardry!</h1>
                        <p>Hogwarts is divided into four houses, each bearing the last name of its founder:
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
                    <div className="col-12 col-sm-6 align-self-center">
                        <img alt="logo" width="640" height="auto" src={hogwart} />
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
                            <p>&nbsp;&nbsp;Tin tức mới nhất</p>
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
    const {user} = useContext(userContext)
    if (user) {
        return (
            <div className="home">
                <NavBar/>
                <Header/>
                <Notification/>
            </div>
        );
    } else {
        return (
            <div>You are not log in!</div>
        )
    }
}

