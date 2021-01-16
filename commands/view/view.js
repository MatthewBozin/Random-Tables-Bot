module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    let result = "ID: "+table.id+"\nName: "+table.name+"\nCreator: "+table.creator+"\nEntries: ";

    let counter = 1;

    for (element of table.entries) {
        result += "\n"+counter+". "+element.content+" ("+element.creator+"). Tags: ";
        if (element.tags == {}) {
            result += "none.";
        } else {
            let tags = Object.keys(element.tags);
            for (part of tags) {
                result += part+": "+element.tags[part]+"; ";
            };
        };
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