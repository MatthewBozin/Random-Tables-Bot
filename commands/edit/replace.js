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
    let content = entry.content;

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== table.creator && message.author.username !== entry.creator) {
        return message.reply("You do not have the necessary permissions. Only a server mod, the creator of the table, or the creator of the entry can perform this command.");
    };

    args.splice(0, 2);

    let newcontent = args.join(" ");

    let stringsplit = newcontent.split("^");

    for (let i = 0; i < stringsplit.length; i++) {
        if (i%2 !== 0) {
            if (memory.tables[stringsplit[i]] == undefined) {
                return message.reply("The table '"+stringsplit[i]+"' you are referencing between ^^'s doesn't exist, or you have misspelled its name.");
            };
        };
    };

    table.entries[entrynumber].content = newcontent;

    save("./memory/"+message.guild.id+".json", memory);

    message.reply("Entry replaced from table: "+table.id+" Entry: "+content+" by "+entry.creator+". New Content: "+newcontent);

}

module.exports.config = {
    name: "replace",
    description: "Replace a specific entry from a table with new text. syntax: .replace [tableid] [entry number] [new text]",
    usage: ".replace",
    accessableby: "Members",
    aliases: ['re']
}