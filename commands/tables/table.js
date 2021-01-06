const { save, nameid } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {
    const memory = require("../../memory/"+message.guild.id+".json");

    
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

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Table Created! ID: "+id+" Name: "+tablename);

}

module.exports.config = {
    name: "table",
    description: "Creates a new table. syntax: .table [tablename]",
    usage: ".table",
    accessableby: "Members",
    aliases: ['t']
}