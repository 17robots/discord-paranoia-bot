var defaultHelp = `PARANOIA DISCORD BOT COMMAND HELP
COMMANDS:
-- !answer   | answers the question and flip the coin
-- !help     | displays this help screen
-- !match    | starts the game by pairing people to ask questions to others in an order
-- !order    | displays the order of who asks who what
-- !question | asks the person the question in private
-- !specify  | sends a private message to the asker requesting clarification

HOW THE GAME WORKS:
A player will type !match in chat and the order of players asking people will be assigned. The first person will type !question along with the question they have and it will be 
sent to the recipient in private. The recipient will answer the question by typing !answer and the answer. The coin will be flipped automatically and the result will be displayed.
If the coin landed on heads, then the question will also be revealed and the next person will be prompted to answer a question. If it is tails, the question is not displayed and 
the next person will be prompted to ask a question. If a question needs specification, the recipient can use !specify to ask for clarification in private. The asker can respond
with !specify and a message to send to the recipient of the question. The match ends when all players have asked their questions. To start another match, just type !match.`;

var helpStrings = {
    "answer": "\"!answer yes\" - this will answer a question and flip the coin",
    "match" : "\"!match\" - will start a new round and randomy assign people in an order to ask questions",
    "order" : "\"!order\" - will display who asks who what questions: \"Person A -> Person B -> Person C\"",
    "question" : "\"!question do you like pineapple on pizza \" will send a question (in this case \"do you like pineapple on pizza\") to the next person meant to receive the question",
    "specify" : "\!specify i do not know what pineapple is\" will send the asker the message \"i do not know what pineapple is\" if the person typing the command is the recipient of the question; \"! specify Pineapple is a fruit from hawaii\" will send \"Pineapple is a fruit from hawaii\" to the recipient of the question if the person typing the command is the asker"
}

module.exports = {
    help: function (command) {
        if(command.length > 1) {
            if(helpStrings[command[1]]) {
                return helpStrings[command[1]];
            }
        }
        
        return defaultHelp;
    }
}