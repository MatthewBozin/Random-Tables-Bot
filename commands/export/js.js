module.exports.run = async (bot, message, args) => {

    const memory = require("../../memory/"+message.guild.id+".json");

    if (memory.tables[args[0]] == undefined) {
        return message.reply("Either the table you have referenced doesn't exist, or you have misspelled its name!")
    };

    let tablename = args[0];

    let object = memory.tables[tablename];

    let variable = "'"+object.id+"':[";
    let final = "]";

    for (element of object.entries) {
        variable += "\n'"+element.content+"',";
    };

    variable = variable.slice(0, -1);

    let result = `<br><button onclick='f(`+object.id+`)'>`+object.name+`</button><div id='d`+object.id+`'></div><script>function f(id) {document.getElementById("d"+id).innerHTML = s(tables[id].entries);};function r(c) {return Math.floor(Math.random() * c);}function s(array) {return array[r(array.length)];let tables = {`+variable+final+`};}</script>`;

    message.channel.send(result, { split: true });

}

module.exports.config = {
    name: "js",
    description: "Turn a table into a block of HTML code. syntax: .js [tableid]",
    usage: ".js",
    accessableby: "Members",
    aliases: ['j']
}