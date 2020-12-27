const memory = require("../../memory.json");

module.exports.run = async (bot, message, args) => {
    
    let result = "Tables:";

    let tables = Object.keys(memory.tables);

    for (element of tables) {
        result += "\n"+memory.tables[element].name+" ("+memory.tables[element].creator+") "+memory.tables[element].entries.length+" entries.";
    };

    message.channel.send(result, { split: true });

}

module.exports.config = {
    name: "viewall",
    description: "View the info and entries of a table. syntax: .viewall",
    usage: ".viewall",
    accessableby: "Members",
    aliases: ['va']
}