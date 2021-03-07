import envURL from "./characterImages";
import Gryffindor from "../img/house_img/Gryffindor.png";
import Hufflepuff from "../img/house_img/Hufflepuff.png";
import Ravenclaw from "../img/house_img/Ravenclaw.png";
import Slytherin from "../img/house_img/Slytherin.png";
import React from "react";

export const Leader = [
    {
        name: 'Professor Albus Dumbledore',
        description: 'Albus Dumbledore was never proud or vain; he could find something to value in anyone, however apparently insignificant or wretched, and I believe that his early losses endowed him with great humanity and sympathy. I shall miss his friendship more than I can say, but my loss is as nothing compared to the Wizarding world’s. That he was the most inspiring and the best loved of all Hogwarts headmasters cannot be in question. He died as he lived: working always for the greater good and, to his last hour, as willing to stretch out a hand to a small boy with dragon pox as he was on the day that I met him.',
        image: `${envURL}/Albus%20Percival%20Wulfric%20Brian%20Dumbledore1.jpg`
    },
    {
        name: 'Professor Minerva McGonagall',
        description: 'Professor Minerva McGonagall is the Transfiguration teacher at Hogwarts, head of Gryffindor house and deputy headmistress of Hogwarts during Harry\'s first year. She is described as fair, but very strict. Amongst other things, she led Harry to his sorting in his first year. She has the ability to transform into a tabby cat, because she is animaugus.',
        image: `${envURL}/Minerva%20McGonagall1.jpg`
    },
    {
        name: 'Professor Filius Flitwick',
        description: 'Professor Filius Flitwick was the Charms master and head of Ravenclaw house during Harry\'s first year at Hogwarts. He is described as "the best and most knowledgable Charms master alive in the world today." He has a remarkably short stature - Rowling has stated that he has "a dash of goblin blood.',
        image: `${envURL}/Filius%20Flitwick1.jpg`
    },
    {
        name: 'Professor Severus Snape',
        description: 'Professor Severus Snape is the Potions master and head of Slytherin house, and is seen as the main secondary antagonist up until the end of the first book. His most notable appearance is during Chapter 8, which is named after him ("The Potions Master"). He teaches in the dungeons\' Potions Classroom.',
        image: `${envURL}/Severus%20Snape1.jpg`
    }
]
export const trList = [
    {
        title: 'Name/Crest',
        description: [
            <><p title="Gryffindor">Gryffindor</p><img className="house_img" alt="Gryffindor" src={Gryffindor} /></>,
            <><p title="Hufflepuff">Hufflepuff</p><img className="house_img" alt="Hufflepuff" src={Hufflepuff} /></>,
            <><p title="Ravenclaw">Ravenclaw</p><img className="house_img" alt="Ravenclaw" src={Ravenclaw} /></>,
            <><p title="Slytherin">Slytherin</p><img className="house_img" alt="Slytherin" src={Slytherin} /></>,
        ]
    },
    {
        title: 'Founded By',
        description: [
            <p  title="Godric Gryffindor">Godric Gryffindor</p>,
            <p  title="Helga Hufflepuff">Helga Hufflepuff</p>,
            <p  title="Rowena Ravenclaw">Rowena Ravenclaw</p>,
            <p  title="Salazar Slytherin">Salazar Slytherin</p>
        ]
    },
    {
        title: 'House Ghost',
        description: [
            <p  title="Nicholas de Mimsy-Porpington">Nearly Headless Nick</p>,
            <p  title="Fat Friar">Fat Friar</p>,
            <p  title="Helena Ravenclaw">Helena Ravenclaw</p>,
            <p  title="Bloody Baron">Bloody Baron</p>
        ]
    },
    {
        title: 'House symbol',
        description: [
            <p  title="Lion">Lion</p>,
            <p  title="Badger">Badger</p>,
            <p  title="Eagle">Eagle</p>,
            <p  title="Snake">Snake</p>
        ]
    },
    {
        title: 'House colours',
        description: [
            <p>Deep red and gold</p>,
            <p>Yellow and black</p>,
            <p>Blue and bronze</p>,
            <p>Green and silver</p>
        ]
    },
    {
        title: 'Description',
        description: [
            <p>Well known for courage, bravery, daring, nerve, and chivalry.</p>,
            <p>Well known for loyalty, patience, hard work, fair-play, honesty, and tolerance.</p>,
            <p>Values intelligence, wit, cleverness, creativity, and wisdom.</p>,
            <p>Values ambition, leadership, cunning, deter-mination, and resource-fulness.</p>
        ]
    },
    {
        title: 'Common room',
        description: [
            <p>The entrance to the common room was on the seventh floor hidden behind a portrait of the Fat Lady.
                To enter, the correct password must be provided.</p>,
            <p>Located near the kitchens. To enter, one must tap a fake barrel in the rhythm "Helga Hufflepuff."
                It was the only common room to have a way to keep students from other houses out (by dumping vinegar on them).</p>,
            <p>Located in a high tower, and the interior was decorated with blue and bronze. To enter, one must
                answer a riddle from an eagle door knocker.</p>,
            <p>Located in the dungeons, underneath the Black Lake, and hidden behind a stone wall. To enter,
                the correct password must be provided.</p>
        ]
    }
]
export const NotificationList = [
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