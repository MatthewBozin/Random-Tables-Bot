const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };

    if (isNaN(args[1]) || parseInt(args[0]) <= 0) {
        return message.reply("You did not provide a valid entry number!");
    };
    
    let tableid = args[0];
    let entrynumber = args[1] - 1;

    let table = memory.tables[tableid];
    let entry = table.entries[entrynumber];

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== table.creator && message.author.username !== entry.creator) {
        return message.reply("You do not have the necessary permissions. Only a server mod, the creator of the table, or the creator of the entry can perform this command.");
    };

    table.entries.splice(entrynumber, 1);

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Entry deleted from table: "+table.id+" Entry: "+entry.content+" by "+entry.creator);

}

module.exports.config = {
    name: "dentry",
    description: "Delete a specific entry from a table. syntax: .dentry [tableid] [entry number]",
    usage: ".dentry",
    accessableby: "Moderators",
    aliases: ['de']
}