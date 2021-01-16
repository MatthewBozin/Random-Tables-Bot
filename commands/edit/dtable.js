const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== memory.tables[args[0]].creator && message.author.id !== "272554505944432650") {
        return message.reply("You do not have the necessary permissions. Only a server mod or the creator of the table can perform this command.");
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    delete memory.tables[tableid];

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Table deleted: "+table.id+" by "+table.creator);

}

module.exports.config = {
    name: "dtable",
    description: "Delete an entire table. syntax: .dtable [tableid]",
    usage: ".dtable",
    accessableby: "Moderators",
    aliases: ['dt']
}