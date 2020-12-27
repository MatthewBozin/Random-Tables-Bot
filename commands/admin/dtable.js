const memory = require("../../memory.json");
const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You do not have the necessary permissions to perform this command!");
    };

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    delete memory.tables[tableid];



    save("./memory.json", memory);

    message.reply("Table deleted: "+table.id+" by "+table.creator);

}

module.exports.config = {
    name: "dtable",
    description: "Delete an entire table. syntax: .dtable [tableid]",
    usage: ".dtable",
    accessableby: "Moderators",
    aliases: ['dt']
}