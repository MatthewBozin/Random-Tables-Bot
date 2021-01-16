const { save } = require("../../modules/exports");

module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };
    
    let tableid = args[0];
    let table = memory.tables[tableid];

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== table.creator && message.author.id !== "272554505944432650") {
        return message.reply("You do not have the necessary permissions. Only a server mod, the creator of the table, or the creator of the entry can perform this command.");
    };

    let tagname = args[1];

    if (tagname == "creator" || tagname == "content") {
        return message.reply("You cannot add or replace the 'creator' or 'content' tags of entries.")
    };

    args.splice(0, 2);

    let newcontent = args.join(" ");

    for (element of table.entries) {
        if (newcontent == "delete") {
            delete element.tags[tagname];
        } else {
            element.tags[tagname] = newcontent;
        };
    };

    if (newcontent == "delete") {
        message.reply("Tag deleted from table entries: "+table.id+" by "+table.creator+". Tag name: "+tagname);
    } else {
        message.reply("Tag added to table entries: "+table.id+" by "+table.creator+". Tag name: "+tagname+" Tag content: "+newcontent);
    }


    save("./memory/"+message.guild.id+".json", memory);

}

module.exports.config = {
    name: "tagall",
    description: "Add tags to every entry in a table. (see .help for information on tags) syntax: .tagall [tableid] [tagname] [tagcontent]",
    usage: ".tagall",
    accessableby: "Members",
    aliases: ['taga']
}