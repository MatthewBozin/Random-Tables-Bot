const memory = require("../../memory.json");
const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You do not have the necessary permissions to perform this command!");
    };

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
    table.entries.splice(entrynumber, 1);

    save("./memory.json", memory);

    message.reply("Entry deleted from table: "+table.id+" Entry: "+entry.content+" by "+entry.creator);

}

module.exports.config = {
    name: "dentry",
    description: "Delete a specific entry from a table. syntax: .dentry [tableid] [entry number]",
    usage: ".dentry",
    accessableby: "Moderators",
    aliases: ['de']
}