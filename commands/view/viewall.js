module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");
    
    let result = "Tables:";

    let tables = Object.keys(memory.tables);

    if (args.length > 1) {
        let tag = args[1];
        for (element of tables) {
            let table = memory.tables[element];
            if (table.tags[tag] !== undefined) {
                result += "\n"+table.id+" ("+table.creator+") "+table.entries.length+" entries. Tags: ";
                if (table.tags == {}) {
                    result += "none.";
                } else {
                    let tags = Object.keys(table.tags);
                    for (part of tags) {
                        result += part+": "+table.tags[part]+"; ";
                    };
                };
            };
        };
    } else {
        for (element of tables) {
            let table = memory.tables[element];
            result += "\n"+table.id+" ("+table.creator+") "+table.entries.length+" entries. Tags: ";
            if (table.tags == {}) {
                result += "none.";
            } else {
                let tags = Object.keys(table.tags);
                for (part of tags) {
                    result += part+": "+table.tags[part]+"; ";
                };
            };
        };
    };

    message.channel.send(result, { split: true });

}

module.exports.config = {
    name: "viewall",
    description: "View the info and entries of a table. syntax: .viewall",
    usage: ".viewall",
    accessableby: "Members",
    aliases: ['va']
}