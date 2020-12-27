const memory = require("../../memory.json");
const { save } = require("../../modules/exports");
const { nameid } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {
    
    if (memory.tables[args[0]] !== undefined) {
        return message.reply("A table by that name already exists!")
    };

    let tablename = args.join(" ");
    nameid(tablename);
    let creatorname = message.author.username;

    memory.tables[id] = {
        "id":id,
        "name":tablename,
        "creator":creatorname,
        "entries":[]
    };

    save("./memory.json", memory);

    message.reply("Table Created! ID: "+id+" Name: "+tablename);

}

module.exports.config = {
    name: "table",
    description: "Creates a new table. syntax: .table [tablename]",
    usage: ".table",
    accessableby: "Members",
    aliases: ['t']
}