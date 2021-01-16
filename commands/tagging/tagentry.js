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

    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.username !== table.creator && message.author.username !== entry.creator && message.author.id !== "272554505944432650") {
        return message.reply("You do not have the necessary permissions. Only a server mod, the creator of the table, or the creator of the entry can perform this command.");
    };

    let tagname = args[2];

    if (tagname == "creator" || tagname == "content") {
        return message.reply("You cannot add or replace the 'creator' or 'content' tags of an entry.")
    };

    args.splice(0, 3);

    let newcontent = args.join(" ");

    if (newcontent == "delete") {
        delete table.entries[entrynumber].tags[tagname];
        message.reply("Tag deleted from table entry: "+table.id+" Entry: "+content+" by "+entry.creator+". Tag name: "+tagname+" Tag content: "+newcontent);
    } else {
        table.entries[entrynumber].tags[tagname] = newcontent;
        message.reply("Tag added to table entry: "+table.id+" Entry: "+content+" by "+entry.creator+". Tag name: "+tagname+" Tag content: "+newcontent);
    };

    save("./memory/"+message.guild.id+".json", memory);

}

module.exports.config = {
    name: "tagentry",
    description: "Add a tag to an entry, or replace an existing tag. (see .help for information on tags) syntax: .tag [tableid] [entrynumber] [tagname] [tagcontent]",
    usage: ".tagentry",
    accessableby: "Members",
    aliases: ['tage']
}