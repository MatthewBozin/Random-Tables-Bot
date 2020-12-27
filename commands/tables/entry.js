const memory = require("../../memory.json");
const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];
    let content = args[1];
    let creatorname = message.author.username;

    let object = {
        "creator":creatorname,
        "content":content
    };

    let table = memory.tables[tableid];

    table.entries.push(object);

    save("./memory.json", memory);

    message.reply("Entry added to table! ID: "+table.id+" Name: "+table.name+" Entry: "+content);

}

module.exports.config = {
    name: "entry",
    description: "Add an entry to a table. syntax: .entry [tableid] [entry]",
    usage: ".entry",
    accessableby: "Members",
    aliases: ['e']
}