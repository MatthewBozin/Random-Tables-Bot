const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];
    let toremove = args.shift();
    let creatorname = message.author.username;

    let content = args.join(" ");

    let stringsplit = content.split("^");

    for (let i = 0; i < stringsplit.length; i++) {
        if (i%2 !== 0) {
            if (memory.tables[stringsplit[i]] == undefined) {
                return message.reply("The table '"+stringsplit[i]+"' you are referencing between ^^'s doesn't exist, or you have misspelled its name.");
            };
        };
    };

    let object = {
        "creator":creatorname,
        "content":args.join(" "),
        "tags":{}
    };

    let table = memory.tables[tableid];

    table.entries.push(object);

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Entry added to table! ID: "+table.id+" Name: "+table.name+" Entry: "+args.join(" "));

}

module.exports.config = {
    name: "entry",
    description: "Add an entry to a table. syntax: .entry [tableid] [entry]",
    usage: ".entry",
    accessableby: "Members",
    aliases: ['e']
}