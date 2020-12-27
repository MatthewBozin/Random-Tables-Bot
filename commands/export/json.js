const memory = require("../../memory.json");

module.exports.run = async (bot, message, args) => {

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tablename = args[0];

    let object = memory.tables[tablename];

    let result2 = JSON.stringify(object);

    result = result2.replace("},{", "},\n{");

    console.log(result);

    message.channel.send(result, { split: true, char: ',' });

}

module.exports.config = {
    name: "json",
    description: "Turn a table into a JSON object. syntax: .json [tableid]",
    usage: ".json",
    accessableby: "Members",
    aliases: ['j']
}