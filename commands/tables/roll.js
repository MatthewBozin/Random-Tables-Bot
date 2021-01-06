const { s, refcheck, refreplace } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");


    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    let result = s(table.entries).content;

    refcheck(result, refreplace, message);

}

module.exports.config = {
    name: "roll",
    description: "Produce a random result from the selected table. syntax: .roll [tableid]",
    usage: ".roll",
    accessableby: "Members",
    aliases: ['r']
}