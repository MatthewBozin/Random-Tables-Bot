const Discord = require('discord.js');
const fs = require("fs");


module.exports.run = async (bot, message, args) => {

    let desc = "This bot was made by Saker Tarsos to help automate Gygaxian Democracy. Below are lists of commands and their syntax (the brackets [] are to denote input fields, do not include them in your commands)";


    let standard = [        
        "\n **.table**: Creates a new table. Syntax: .table [tablename]",
        "\n **.entry**: Add an entry to a table. Syntax: .entry [tableid] [entry content]",
        "\n **.roll**: Produce a random result from the selected table. Syntax: .roll [tableid]",
        "\n **.help**: Lists commands and syntax. syntax: .help"
    ];

    let view = [
        "\n **.viewall**: View the info and entries of a table. Syntax: .viewall",
        "\n **.view**: View the info and entries of a table. Syntax: .view [tableid]"
    ];

    let cexport = [
        "\n **.js**: Turn a table into a block of HTML code. Syntax: .js [tableid]",
        "\n **.json**: Turn a table into a JSON object. Syntax: .json [tableid]"
    ];

    let admin = [
        "\n **.dtable**: Delete an entire table. syntax: .dtable [tableid]",
        "\n **.dentry**: Delete a specific entry from a table. syntax: .dentry [tableid] [entry number]"
    ];

    const embed = new Discord.MessageEmbed()
    .setTitle("Tables Bot Help")
    .setDescription(desc)
    .addField("Standard Commands: ", standard.join(""))
    .addField("View Commands: ", view.join(""))
    .addField("Export Commands: ", cexport.join(""))
    .addField("Admin Commands: ", admin.join(""))
    .setTimestamp() 

    message.channel.send(embed);

}

module.exports.config = {
    name: "help",
    description: "Lists commands and syntax. syntax: .help",
    usage: ".help",
    accessableby: "Members",
    aliases: ['h']
}