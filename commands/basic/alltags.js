const { save } = require("../../modules/exports");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    fs.readdir(`./memory`, (err, files) => {

        if(err) console.log(err);

        files.forEach(file => { 
            const memory = require(`../../memory/`+file);
            console.log(memory.tables);
            for (property in memory.tables) {
                let table = memory.tables[property];
                console.log(table);
                table.tags = {};
                console.log(table.entries);
                for (element of table.entries) {
                    element.tags = {};
                    console.log(element.content)
                }
            };
            save(`./memory/`+file, memory);
        });
    });

}

module.exports.config = {
    name: "alltags",
    description: "Add tags to every entry in a table. (see .help for information on tags) syntax: .tagall [tableid] [tagname] [tagcontent]",
    usage: ".alltags",
    accessableby: "Members",
    aliases: ['allt']
}