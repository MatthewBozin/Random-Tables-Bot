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

    if (tagname == "id" || tagname == "name" || tagname == "creator" || tagname == "entries") {
        return message.reply("You cannot add or replace the 'id', 'name', 'creator', or 'entries' tags of a table.")
    };

    args.splice(0, 2);

    let newcontent = args.join(" ");

    if (newcontent == "delete") {
        delete table.tags[tagname];
        message.reply("Tag deleted from table entry: "+table.id+" by "+table.creator+". Tag name: "+tagname+" Tag content: "+newcontent);
    } else {
        table.tags[tagname] = newcontent;
        message.reply("Tag added to table entry: "+table.id+" by "+table.creator+". Tag name: "+tagname+" Tag content: "+newcontent);
    };

    save("./memory/"+message.guild.id+".json", memory);

}

module.exports.config = {
    name: "tagtable",
    description: "Add a tag to a table, or replace an existing tag. (see .help for information on tags) syntax: .tag [tableid] [tagname] [tagcontent]",
    usage: ".tagtable",
    accessableby: "Members",
    aliases: ['tagt']
}