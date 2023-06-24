let namelist = document.getElementById("namelist");
let addbtn = document.getElementById("addbtn");
let clearbtn = document.getElementById("clearbtn");

//getting user List from Local storage
function getuserlistFromLocalStorage() {
    let stringifieduser_list = localStorage.getItem("user_list");
    let parseduser_list = JSON.parse(stringifieduser_list);
    if (parseduser_list === null) {
        return [];
    } else {
        return parseduser_list;
    }
}

let user_list = getuserlistFromLocalStorage();
let usercount = user_list.length;

//eracing the valus at input box
clearbtn.onclick = function() {
    let fullname = document.getElementById("fullname");
    let phonenumber = document.getElementById("phonenumber");
    fullname.value = "";
    phonenumber.value = "";
};
//Adding User List Function
function onadduser() {
    let fullname = document.getElementById("fullname");
    let username = fullname.value;
    let phonenumber = document.getElementById("phonenumber");
    let usernum = phonenumber.value;
    let text = usernum.toString();
    let numcount = text.length;
    if ((username === "") || (usernum === "") || (parseInt(numcount) < 10) || (parseInt(numcount) > 10)) {
        alert("Enter valid Inputs");
        return;
    }
    usercount += 1;
    let newuse = {
        name: username,
        phone: usernum,
        id: usercount,
    };
    user_list.push(newuse);
    createnamelist(newuse);
    fullname.value = "";
    phonenumber.value = "";
}
//Adding User List Button
addbtn.onclick = function() {
    onadduser();
    //storing User list To Local storage
    localStorage.setItem("user_list", JSON.stringify(user_list));
};

function createnamelist(user) {
    //name list main container
    let namelistdiv = document.createElement("div");
    namelistdiv.classList.add("d-flex", "flex-row", "justify-content-between", "namelistdiv");
    namelist.appendChild(namelistdiv);

    //Profile div 
    let profilediv = document.createElement("div");
    profilediv.classList.add("profilediv");
    namelistdiv.appendChild(profilediv);

    //profile para 
    let profilepara = document.createElement("p");
    profilepara.textContent = user.name[0];
    profilepara.classList.add("profilepara");
    profilediv.appendChild(profilepara);
    //profile Name div 
    let profilenamediv = document.createElement("div");
    namelistdiv.appendChild(profilenamediv);
    //profile name

    let profilename = document.createElement("h4");
    profilename.textContent = user.name;
    profilename.classList.add("profilename");
    profilenamediv.appendChild(profilename);


    //view button 
    let viewbutton = document.createElement("button");
    viewbutton.classList.add("viewbutton");
    viewbutton.id = "button" + user.id;
    let userid = viewbutton.id;
    viewbutton.onclick = function() {
        console.log(userid);
        document.getElementById(userid).addEventListener("click", contactfunction);
        contactfunction(user, userid);
    };
    namelistdiv.appendChild(viewbutton);

    //View icon 
    let viewicon = document.createElement("i");
    viewicon.classList.add("viewicon", "fa", "fa-arrow-right");
    viewbutton.appendChild(viewicon);
}

for (let user of user_list) {
    createnamelist(user);
}
//conection page 
function contactfunction(user, userid) {
    console.log(user.name[0]);
    let chatbotMsgList = ["Hi", "Hey", "Good Morning", "Good Evening", "How can I help you?", "Thank You"];
    let chatcontainer = document.getElementById("chatContainer");
    let userinput = document.getElementById("userInput");
    let sendmessage = document.getElementById("sendMsgBtn");

    function getresponce() {
        let chatbotlength = chatbotMsgList.length;
        let randomno = chatbotMsgList[Math.ceil(Math.random() * chatbotlength) - 1];
        let divsendercontainer = document.createElement("div");
        divsendercontainer.classList.add("msg-from-chatbot-container");
        chatcontainer.appendChild(divsendercontainer);

        let containerel = document.createElement("span");
        containerel.textContent = randomno;
        containerel.classList.add("msg-from-chatbot");
        chatcontainer.appendChild(containerel);

    }

    sendmessage.onclick = function() {
        let getinput = userinput.value;

        let divsendercontainer = document.createElement("div");
        divsendercontainer.classList.add("msg-to-chatbot-container");
        chatcontainer.appendChild(divsendercontainer);

        let spansendercontainer = document.createElement("span");
        spansendercontainer.textContent = getinput;
        spansendercontainer.classList.add("msg-to-chatbot");
        divsendercontainer.appendChild(spansendercontainer);

        userinput.value = "";

        getresponce();
    };
    //conection page 
    let maincont = document.getElementById("maincont");

    function userlist() {

        let paradp = document.createElement("div");
        paradp.classList.add("profiledp");
        maincont.appendChild(paradp);

        let paralet = document.createElement("p");
        paralet.classList.add("paralet");
        paralet.textContent = user.name[0];
        paradp.appendChild(paralet);

        let paraname = document.createElement("h4");
        paraname.textContent = user.name;
        paraname.classList.add("paraname");
        maincont.appendChild(paraname);

        let icondiv = document.createElement("div");
        maincont.appendChild(icondiv);

        let iconvideo = document.createElement("i");
        iconvideo.classList.add("fa", "fa-video", "iconvideo");
        icondiv.appendChild(iconvideo);

        let iconicon = document.createElement("i");
        iconicon.classList.add("fa", "fa-phone", "icon");
        icondiv.appendChild(iconicon);
    }

    userlist();
}
