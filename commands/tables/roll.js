const memory = require("../../memory.json");
const { r, s } = require("../../modules/exports");


module.exports.run = async (bot, message, args) => {

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];

    let table = memory.tables[tableid];

    let result = s(table.entries).content;

    message.reply(result);

}

module.exports.config = {
    name: "roll",
    description: "Produce a random result from the selected table. syntax: .roll [tableid]",
    usage: ".roll",
    accessableby: "Members",
    aliases: ['r']
}