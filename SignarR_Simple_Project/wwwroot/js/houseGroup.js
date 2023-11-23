// 1
// Create Connection
// Url is inside the Program.cs
// den ksekina akoma....ksekina molis tou poume sto telos toy arxeiou
var connectionHouse = new signalR.HubConnectionBuilder()
                                    //.configureLogging(signalR.Loglevel.Information)
                                .withUrl("/hubs/houseGroupHub").build();
// epishs orizoume ton tipo sindesis....edw einai Websockets



let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


btn_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Slytherin");
    event.preventDefault();
});


btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("RemoveHouse", "Gryffindor");
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("RemoveHouse", "Hufflepuff");
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("RemoveHouse", "Ravenclaw");
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("RemoveHouse", "Slytherin");
    event.preventDefault();
});


trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotification", "Gryffindor");
    event.preventDefault();
});

trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotification", "Hufflepuff");
    event.preventDefault();
});

trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotification", "Ravenclaw");
    event.preventDefault();
});

trigger_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotification", "Slytherin");
    event.preventDefault();
});


connectionHouse.on("subscriptionStatus", (strGroupHoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupHoined;
    if (hasSubscribed) {
        // subscribe
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = 'none';
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = 'none';
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }

        toastr.success(`You have subscribed Successfully. ${houseName}`);
    }
    else {
        // unsubscribe
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = '';
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = '';
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        toastr.success(`You have unsubscribed Successfully. ${houseName}`);
    }
});



connectionHouse.on("triggerHouseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched.`);
});


connectionHouse.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Member has subscribed to ${houseName}`);
});

connectionHouse.on("newMemberRemovededToHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`);
});

function fulfilled() {
    console.log("\n\n\nConnection to HouseHub is OK\n\n\n");
}


function rejected() {

}


connectionHouse.start().then(fulfilled, rejected);