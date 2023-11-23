// 1
// Create Connection
// Url is inside the Program.cs
// den ksekina akoma....ksekina molis tou poume sto telos toy arxeiou
var connectionChat = new signalR.HubConnectionBuilder()
                                    //.configureLogging(signalR.Loglevel.Information)
                                    .withUrl("/hubs/chat",).build();
// epishs orizoume ton tipo sindesis....edw einai Websockets


document.getElementById("sendMessage").disabled = true;

connectionChat.on("MessageReceived", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} - ${message}`;
    Console.log(li.textContent.toString());
});

document.getElementById("sendMessage").addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;

    var receiver = document.getElementById("receiverEmail").value;
    console.log("1111111111111111111111111111111111");
    if (receiver.length > 0) {

        console.log("2222222222222222222222222222222222");

        connectionChat.send("SendMessageToReceiver", sender, receiver, message).catch(function (err) {
            return console.error(err.toString());
        });


    } else {


        connectionChat.send("SendMessageToAll", sender, message).catch(function (err) {
            return console.error(err.toString());
        });

        console.log("333333333333333333333333333333333333333333333");

    }

    event.preventDefault();
})


connectionChat.start().then(function () {
    document.getElementById("sendMessage").disabled = false;
});

