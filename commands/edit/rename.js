const { save, nameid } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== memory.tables[args[0]].creator) {
        return message.reply("You do not have the necessary permissions. Only a server mod or the creator of the table can perform this command.");
    };

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let toremove = args.shift();

    let oldname = memory.tables[tableid].name;

    let newname = args.join(" ");    
    nameid(newname);

    memory.tables[id] = memory.tables[tableid];

    memory.tables[id].name = newname;

    memory.tables[id].id = id;

    delete memory.tables[tableid];

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Table by "+memory.tables[id].creator+" renamed. Old: "+oldname+". New: "+newname+".");

}

module.exports.config = {
    name: "rename",
    description: "Rename a table. syntax: .rename [tableid] [new name]",
    usage: ".rename",
    accessableby: "Moderators",
    aliases: ['r']
}