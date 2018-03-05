const token = "NDE5OTgwMzE3MjE0OTAwMjM5.DX4A9A.EagPnrwG6JrFZhmfLdJVMswUIwk";
var client = new(require("discord.js")).Client();
var help = require("./help.js");

var personOrder = [];
var inProgress = false;



function parsemsg(msg) {
    if (msg.content.toLowerCase().substr(0,1) !== "!") {
        return;
    }

    var msgObj = msg;
    var sender = msgObj.toString();
    msg = msgObj.content.substring(1, msg.content.length).toLowerCase().split(" ").filter((item, index, inputArray) => {
        return item !== "";
    });

    for(var i = 0; i < msg.length; i++) {
        msg[i] = msg[i].split("\r")[0].split("\n")[0];
    }

    switch(msg[0]) {
        case "answer":
            msgObj.delete(0).then(function () {
                msgObj.reply("answer is unavailable now please wait till later");
            });
            break;
        case "help":
            msgObj.reply(help.help(msg));
            break;
        case "match":
            msgObj.reply("match does not work just yet please hold on");
            if(inProgress) {
                msgObj.reply("There is already a game in play please wait till that one finishes");
            } else {
                inProgress = true;

                //create the player order
                for(var i = 0; i < client.users.length; i++) {

                }
            }
            break;
        case "order":
            // msgObj.reply("order does not work just yet please hold on");
            if(inProgress) {
                var returnString = `the player order is as follows: ` + personOrder[0].username;
                for (var i = 0; i < personOrder.length; i++) {
                    returnString += (' -> ' + personOrder[i].username);
                }
                msgObj.reply(returnString);
            } else {
                msgObj.reply('There is currently no match going on. You can start one by typing \"!match.\"');
            }
            break;
        case "question":
            msgObj.reply("question does not work just yet please hold on");
            break;
        case "specify":
            msgObj.reply("specify does not work just yet please hold on");
            break; 
    }
}
//  i like cats?
function handlemsg(msg) {
    try {
        parsemsg(msg);
    } catch(e) {
        msg.reply("Invalid command or invalid number of arguments. Please type !help to see a list of commands.");
        console.log(e);
    }
}

client.on("message", (msg) => {
    handlemsg(msg);
});

client.on("messageUpdate", (omsg, nmsg) => {
    handlemsg(nmsg);
})

client.login(token);