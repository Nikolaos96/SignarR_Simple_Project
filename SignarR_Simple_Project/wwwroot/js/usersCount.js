// 1
// Create Connection
// Url is inside the Program.cs
// den ksekina akoma....ksekina molis tou poume sto telos toy arxeiou
var connectionUserCount = new signalR.HubConnectionBuilder()
                                    //.configureLogging(signalR.Loglevel.Information)
    .withUrl("/hubs/userCount", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets}).build();


// 2
// connect to methods that hub invokes aka receive notifications from hub
// Όταν ληφθεί ένα μήνυμα με την ονομασία "updateTotalViews" από τον hub.
// Αυτή η λειτουργία ενημερώνει την τιμή του στοιχείου HTML με την ID "totalViewsCounter".
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerHTML = value.toString();
});


//
connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerHTML = value.toString();
});
//


// 3
// invoke hub methods aka send notification to hub
// to send den epistrefei kati
// invoke epistrefei timi
// to Nikos einai mia parametros pou pername sto hub gia paradeigma
// to NewWindowLoaded einai to hub .... ara kalei to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "Nikos").then((value) => console.log(value));
}

// 4
// Start Connection
// Succes do something
function fulfilled() {
    console.log("Connection to User Hub Successful!");
    newWindowLoadedOnClient();
}

// Error
function rejected() {
    console.log("Erorr");
}

// κανει την συνδεση με το hub και εφοσον ειναι οκ η συνδεση τοτε εκτελειται το fulfilled διαφορετικα rejected
connectionUserCount.start().then(fulfilled, rejected);

