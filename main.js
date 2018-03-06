const token = "NDE5OTgwMzE3MjE0OTAwMjM5.DX4A9A.EagPnrwG6JrFZhmfLdJVMswUIwk";
var client = new(require("discord.js")).Client();
var help = require("./help.js");

var personOrder = [];
var inProgress = false;

function hasElement(array, element) {
    return array.indexOf(element) != -1;
}

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

                // make the array of players first 
                var players = client.users.array();
                //create the player order
                while(personOrder.length < players.length) {
                    var userIndex = Math.floor(Math.random() * players.length);

                    if (hasElement(personOrder, userIndex)) {
                        continue;
                    } else {
                        personOrder.push(userIndex);
                    }
                }

                // replace indexes with players in that index
                for(var i = 0; i < players.length; i++) {
                    personOrder[i] = players[personOrder[i]];
                }

                var index;

                // remove the botplayer
                for (p in personOrder) {
                    if (p.username === "paranoia-bot") {
                        index = bot;
                    }
                }

                personOrder.filter(function(i) {
                    return i.username != "paranoia-bot";
                });

                msgObj.reply('Created player order');
            }
            break;
        case "order":
            // msgObj.reply("order does not work just yet please hold on");
            if(inProgress) {
                var returnString = `the player order is as follows: ` + personOrder[0].username;
                for (var i = 1; i < personOrder.length; i++) {
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
        case "end":
            inProgress = false;
            msgObj.reply('FOR TESTING ONLY PLEASE DELETE THIS LATER, but the game has ended.');
            personOrder = [];
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