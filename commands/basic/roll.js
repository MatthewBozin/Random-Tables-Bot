const { s, refcheck, refreplace } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    let table = "";

    if (args[0] == "random") {
        let tables1 = Object.keys(memory.tables);
        table = memory.tables[s(tables1)];
        console.log(table);
    } else {
        if (memory.tables[args[0]] == undefined) {
            return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
        };
        
        let tableid = args[0];
    
        table = memory.tables[tableid];
    };

    let result = s(table.entries);
    console.log(result);

    if (result.tags == undefined) {
        result.tags = {};
    };

    let content = result.content;

    refcheck(result, content, refreplace, message);

}

module.exports.config = {
    name: "roll",
    description: "Produce a random result from the selected table. syntax: .roll [tableid]",
    usage: ".roll",
    accessableby: "Members",
    aliases: ['r']
}