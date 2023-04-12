let socket = io("/");

let name = "";
let roomId = "";
let date = new Date()

$(document).ready(function () {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    name = urlParams.get("name");
    roomId = urlParams.get("roomId");


    socket.emit("join-room", name, roomId);
})


socket.on("user-connected", (name) => {
    let html = `
    <div class="ro">
        <div class="d-flex justify-content-center">
        ${name} just joined the room!
        <div>
    <div>
    `

    $("#chat-area").append(html);
})


$(".send-msg").click(function () {
    let msg = $("#chat-msg").val();
    if (msg === "") {
        ;
    }
    else {
        socket.emit("message", name, roomId, msg);

        let html = `
        <div class="row memsg">
            <div class="col-12 col-md-12 col-lg-12">
            ${date.toLocaleTimeString()}
                Me: ${msg}
            </div>
        </div>
        `


        $("#chat-area").append(html);
        $("#chat-msg").val(""); //line 48
    }
})

$("#chat-msg").keydown(function (e) {
    if (e.keyCode == 13) {
        $(".send-msg").click();
    }
})

socket.on("receive-msg", (userName, msg) => {

    

        let html = `
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
            ${date.toLocaleTimeString()}
                ${userName}: ${msg}
            </div>
        </div>
        `
        if (name!== userName){
            
            $("#chat-area").append(html);
        }


})