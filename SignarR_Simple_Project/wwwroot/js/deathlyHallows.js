// 1
// Create Connection
// Url is inside the Program.cs
// den ksekina akoma....ksekina molis tou poume sto telos toy arxeiou
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
                                    //.configureLogging(signalR.Loglevel.Information)
                                    .withUrl("/hubs/deathlyhallows").build();
                                    // den vazei WebSockets edw   signalR.HttpTransportType.WebSockets


var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


// 2
// connect to methods that hub invokes aka receive notifications from hub
// Όταν ληφθεί ένα μήνυμα με την ονομασία "updateTotalViews" από τον hub.
// Αυτή η λειτουργία ενημερώνει την τιμή του στοιχείου HTML με την ID "totalViewsCounter".
connectionDeathlyHallows.on("updateDeathlyHallows", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});


// 4
// Start Connection
// Succes do something
function fulfilled() {
    // Auto to kanoume gia na enimeronoume tin selida apo tin prwth fora
    // me to pou anoigei h selida
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
    console.log("Connection to User Hub Successful!");
}
// Error
function rejected() {
    console.log("Erorr");
}


// κανει την συνδεση με το hub και εφοσον ειναι οκ η συνδεση τοτε εκτελειται το fulfilled διαφορετικα rejected
connectionDeathlyHallows.start().then(fulfilled, rejected);