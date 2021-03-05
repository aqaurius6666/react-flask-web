import envURL from "./characterImages";
import Gryffindor from "../img/house_img/Gryffindor.png";
import Hufflepuff from "../img/house_img/Hufflepuff.png";
import Ravenclaw from "../img/house_img/Ravenclaw.png";
import Slytherin from "../img/house_img/Slytherin.png";
import React from "react";
import houseImages from "./houseImages";

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
    },
    {
        name: 'Professor Pomona Sprout',
        description: 'Professor Pomona Sprout was a witch who worked as Head of Hufflepuff House and Head of the Herbology department at Hogwarts School of Witchcraft and Wizardry. She attended the school in her youth, where she was Sorted into Hufflepuff and excelled at Herbology. Some time after her graduation, Sprout returned to Hogwarts to teach.',
        image: `${envURL}/Pomona%20Sprout1.jpg`
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
export const SubjectList = [
    {
        description: 'Astronomy is the only field of study at Hogwarts that has a direct equivalent in the Muggle world. Astronomy classes take place in the Astronomy Tower, the tallest tower in Hogwarts.',
        name: 'Astronomy'
    },
    {
        description: 'Charms is the type of spells concerned with giving an object new and unexpected properties, and hence this class mainly consists on learning those sorts of spells. Charms classes are described as notoriously noisy and chaotic, as the lessons are largely practical.',
        name: 'Charms'
    },
    {
        description: 'Defence Against the Dark Arts, commonly shortened to D.A.D.A., is the class that teaches students defensive techniques to defend against the Dark Arts, and to be protected from dark creatures.',
        name: 'Defence Against the Dark Arts'
    },
    {
        description: 'Herbology is the study of magical plants and how to take care of, utilise and combat them. There are at least three greenhouses, holding a variety of magical plants of varying degrees of lethality.',
        name: 'Herbology'
    },
    {
        description: 'History of Magic is the study of magical history. Cuthbert Binns\' lessons are depicted as some of the most boring at Hogwarts. They are only lectures, given without pause, about significant events in wizarding history.',
        name: 'History of Magic'
    },
    {
        description: 'Potions is described as the art of creating mixtures with magical effects. It requires the correct mixing and stirring of ingredients at the right times and temperatures.',
        name: 'Potions'
    },
    {
        description: 'Transfiguration is the art of changing the form or appearance of an object, and hence this is what this class teaches. Transfiguration is a theory-based subject, including topics such as "Switching Spells',
        name: 'Transfiguration'
    },
]
export const CourseList = [
    {"cid":"AST0","credit":4,"name":"Astronomy","place":"101 Griffindor","refer":null,"tid":"1134","time":"S2"},
    {"cid":"CHA0","credit":4,"name":"Charms","place":"102 Griffindor","refer":null,"tid":"1037","time":"S3"},
    {"cid":"DEF0","credit":4,"name":"Defence Against the Dark Arts","place":"101 Slytherin","refer":null,"tid":"1004","time":"S4"},
    {"cid":"HER0","credit":4,"name":"Herbology","place":"102 Slytherin","refer":null,"tid":"1082","time":"S5"},
    {"cid":"HIS0","credit":4,"name":"History of Magic","place":"101 Hufflepuff","refer":null,"tid":"1072","time":"S6"},
    {"cid":"POT0","credit":4,"name":"Potions","place":"102 Hufflepuff","refer":null,"tid":"1046","time":"S7"},
    {"cid":"TRA0","credit":4,"name":"Transfiguration","place":"101 Ravenclaw","refer":null,"tid":"1030","time":"S2"},
    {"cid":"ARI0","credit":3,"name":"Arithmancy","place":"102 Ravenclaw","refer":null,"tid":"1135","time":"S3"},
    {"cid":"CAR0","credit":3,"name":"Care of Magical Creatures","place":"101 Griffindor","refer":null,"tid":"1005","time":"S4"},
    {"cid":"DIV0","credit":3,"name":"Divination ","place":"102 Griffindor","refer":null,"tid":"1051","time":"S5"},
    {"cid":"STU0","credit":3,"name":"Study of Ancient Runes","place":"101 Slytherin","refer":null,"tid":"1133","time":"S6"},
    {"cid":"ADV0","credit":3,"name":"Advanced Arithmancy Studies","place":"102 Slytherin","refer":null,"tid":"1015","time":"S7"},
    {"cid":"APP0","credit":3,"name":"Apparition","place":"101 Hufflepuff","refer":null,"tid":"1096","time":"S2"},
    {"cid":"ALC0","credit":3,"name":"Alchemy","place":"102 Hufflepuff","refer":null,"tid":"1082","time":"S3"},
    {"cid":"FLY0","credit":3,"name":"Flying","place":"101 Ravenclaw","refer":null,"tid":"1132","time":"S4"},
    {"cid":"ADV1","credit":2,"name":"Advance Apparition","place":"102 Ravenclaw","refer":null,"tid":"1074","time":"S5"},
    {"cid":"ART0","credit":2,"name":"Art","place":"101 Griffindor","refer":null,"tid":"1133","time":"S6"},
    {"cid":"ANC0","credit":2,"name":"Ancient Studies","place":"102 Griffindor","refer":null,"tid":"1036","time":"S7"},
    {"cid":"GHO0","credit":2,"name":"Ghoul Studies","place":"101 Slytherin","refer":null,"tid":"1052","time":"S2"},
    {"cid":"MAG0","credit":2,"name":"Magical Theory","place":"102 Slytherin","refer":null,"tid":"1133","time":"S3"},
    {"cid":"MUG0","credit":2,"name":"Muggle Art","place":"101 Hufflepuff","refer":null,"tid":"1033","time":"S4"},
    {"cid":"MUG1","credit":2,"name":"Muggle Music","place":"102 Hufflepuff","refer":null,"tid":"1074","time":"S5"},
    {"cid":"MUS0","credit":2,"name":"Music","place":"101 Ravenclaw","refer":null,"tid":"1082","time":"S6"},
    {"cid":"XYL0","credit":2,"name":"Xylomancy","place":"102 Ravenclaw","refer":null,"tid":"1033","time":"S7"},
    {"cid":"AST1","credit":4,"name":"Astronomy","place":"101 Griffindor","refer":null,"tid":"1134","time":"C2"},
    {"cid":"CHA1","credit":4,"name":"Charms","place":"102 Griffindor","refer":null,"tid":"1037","time":"C3"},
    {"cid":"DEF1","credit":4,"name":"Defence Against the Dark Arts","place":"101 Slytherin","refer":null,"tid":"1004","time":"C4"},
    {"cid":"HER1","credit":4,"name":"Herbology","place":"102 Slytherin","refer":null,"tid":"1082","time":"C5"},
    {"cid":"HIS1","credit":4,"name":"History of Magic","place":"101 Hufflepuff","refer":null,"tid":"1072","time":"C6"},
    {"cid":"POT1","credit":4,"name":"Potions","place":"102 Hufflepuff","refer":null,"tid":"1046","time":"C7"},
    {"cid":"TRA1","credit":4,"name":"Transfiguration","place":"101 Ravenclaw","refer":null,"tid":"1030","time":"C2"},
    {"cid":"ARI1","credit":3,"name":"Arithmancy","place":"102 Ravenclaw","refer":null,"tid":"1135","time":"C3"},
    {"cid":"CAR1","credit":3,"name":"Care of Magical Creatures","place":"101 Griffindor","refer":null,"tid":"1005","time":"C4"},
    {"cid":"DIV1","credit":3,"name":"Divination ","place":"102 Griffindor","refer":null,"tid":"1051","time":"C5"},
    {"cid":"STU1","credit":3,"name":"Study of Ancient Runes","place":"101 Slytherin","refer":null,"tid":"1133","time":"C6"},
    {"cid":"ADV2","credit":3,"name":"Advanced Arithmancy Studies","place":"102 Slytherin","refer":null,"tid":"1015","time":"C7"},
    {"cid":"APP1","credit":3,"name":"Apparition","place":"101 Hufflepuff","refer":null,"tid":"1096","time":"C2"},
    {"cid":"ALC1","credit":3,"name":"Alchemy","place":"102 Hufflepuff","refer":null,"tid":"1082","time":"C3"},
    {"cid":"FLY1","credit":3,"name":"Flying","place":"101 Ravenclaw","refer":null,"tid":"1132","time":"C4"},
    {"cid":"ADV3","credit":2,"name":"Advance Apparition","place":"102 Ravenclaw","refer":null,"tid":"1074","time":"C5"},
    {"cid":"ART1","credit":2,"name":"Art","place":"101 Griffindor","refer":null,"tid":"1133","time":"C6"},
    {"cid":"ANC1","credit":2,"name":"Ancient Studies","place":"102 Griffindor","refer":null,"tid":"1036","time":"C7"},
    {"cid":"GHO1","credit":2,"name":"Ghoul Studies","place":"101 Slytherin","refer":null,"tid":"1052","time":"C2"},
    {"cid":"MAG1","credit":2,"name":"Magical Theory","place":"102 Slytherin","refer":null,"tid":"1133","time":"C3"},
    {"cid":"MUG2","credit":2,"name":"Muggle Art","place":"101 Hufflepuff","refer":null,"tid":"1033","time":"C4"},
    {"cid":"MUG3","credit":2,"name":"Muggle Music","place":"102 Hufflepuff","refer":null,"tid":"1074","time":"C5"},
    {"cid":"MUS1","credit":2,"name":"Music","place":"101 Ravenclaw","refer":null,"tid":"1082","time":"C6"},{"cid":"XYL1","credit":2,"name":"Xylomancy","place":"102 Ravenclaw","refer":null,"tid":"1033","time":"C7"}]
export const TeacherList = [
    {"degree":null,"dob":"28/06/1881","house":"Gryffindor","name":"Albus Percival Wulfric Brian Dumbledore","role":"Teacher","tid":"1004"},
    {"degree":null,"dob":"06/12/1928","house":"Gryffindor","name":"Rubeus Hagrid","role":"Teacher","tid":"1005"},
    {"degree":null,"dob":"10/03/1960","house":"Gryffindor","name":"Remus John Lupin","role":"Teacher","tid":"1015"},
    {"degree":null,"dob":"04/10/2021","house":"Gryffindor","name":"Minerva McGonagall","role":"Teacher","tid":"1030"},
    {"degree":null,"dob":"22/12/1970","house":"Ravenclaw","name":"Quirinus Quirrell","role":"Teacher","tid":"1033"},
    {"degree":null,"dob":"26/01/1964","house":"Ravenclaw","name":"Gilderoy Lockhart","role":"Teacher","tid":"1036"},
    {"degree":null,"dob":"20/09/1958","house":"Ravenclaw","name":"Filius Flitwick","role":"Teacher","tid":"1037"},
    {"degree":null,"dob":"01/09/1962","house":"Ravenclaw","name":"Sybill Patricia Trelawney","role":"Teacher","tid":"1038"},
    {"degree":null,"dob":"06/04/1960","house":"Slytherin","name":"Severus Snape","role":"Teacher","tid":"1046"},
    {"degree":null,"dob":"26/08/2021","house":"Slytherin","name":"Dolores Jane Umbridge","role":"Teacher","tid":"1051"},
    {"degree":null,"dob":"28/04/2021","house":"Slytherin","name":"Horace Eugene Flaccus Slughorn","role":"Teacher","tid":"1052"},
    {"degree":null,"dob":"13/10/2000","house":"Slytherin","name":"Salazar Slytherin","role":"Teacher","tid":"1068"},
    {"degree":null,"dob":"13/10/2000","house":"Gryffindor","name":"Godric Gryffindor","role":"Teacher","tid":"1069"},
    {"degree":null,"dob":"13/10/2000","house":"Ravenclaw","name":"Rowena Ravenclaw","role":"Teacher","tid":"1070"},
    {"degree":null,"dob":"17/02/1946","house":"Slytherin","name":"Cuthbert Binns","role":"Teacher","tid":"1072"},
    {"degree":null,"dob":"17/03/1976","house":"Hufflepuff","name":"Charity Burbage","role":"Teacher","tid":"1074"},
    {"degree":null,"dob":"13/10/2000","house":"Hufflepuff","name":"Helga Hufflepuff","role":"Teacher","tid":"1078"},
    {"degree":null,"dob":"15/05/2021","house":"Hufflepuff","name":"Pomona Sprout","role":"Teacher","tid":"1082"},
    {"degree":null,"dob":"17/01/1960","house":"Gryffindor","name":"Alastor Moody","role":"Teacher","tid":"1096"},
    {"degree":null,"dob":"10/02/1918","house":"Gryffindor","name":"Rolanda Hooch","role":"Teacher","tid":"1132"},
    {"degree":null,"dob":"06/01/1966","house":"Slytherin","name":"Irma Pince","role":"Teacher","tid":"1133"},
    {"degree":null,"dob":"22/08/1968","house":"Slytherin","name":"Aurora Sinistra","role":"Teacher","tid":"1134"},
    {"degree":null,"dob":"24/10/1974","house":"Hufflepuff","name":"Septima Vector","role":"Teacher","tid":"1135"}]

export function checkCID(cid) {
    return CourseList.filter(item => item.cid == cid)[0]
}

export function checkSID(tid) {
    return TeacherList.filter(item => item.tid == tid)[0]
}

export const findCharacterImage = (name = "Unknown") => {
    if (name === "") return `${envURL}/Unknown1.jpg`
    let URL = name.replace(/\s/g, '%20')
    return `${envURL}/${URL}1.jpg`
}

export const checkHouseImg = (house) => {
    switch (house) {
        case 'Gryffindor':
            return houseImages[0]
        case 'Slytherin':
            return houseImages[1]
        case 'Hufflepuff':
            return houseImages[2]
        case 'Ravenclaw':
            return houseImages[3]
        default:
            return houseImages[2]
    }
}

export function checkHaveCourse(courseList, course) {
    return courseList.includes(course.cid)
}