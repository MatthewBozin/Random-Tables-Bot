const memory = require("../../memory.json");

module.exports.run = async (bot, message, args) => {

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    let result = "Name: "+table.name+"\n Creator: "+table.creator+"\n Entries: ";

    let counter = 1;

    for (element of table.entries) {
        result += "\n"+counter+". "+element.content+" ("+element.creator+")";
        counter++;
    };

    message.channel.send(result, { split: true });

}

module.exports.config = {
    name: "view",
    description: "View the info and entries of a table. syntax: .view [tableid]",
    usage: ".view",
    accessableby: "Members",
    aliases: ['v']
}