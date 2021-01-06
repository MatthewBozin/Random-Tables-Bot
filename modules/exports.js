const fs = require("fs");

const d = function(a, b){i = 0;total = 0;while (i<a) {total += Math.floor(Math.random() * b)+1;i++;}return total};

const r = function(c) {return Math.floor(Math.random() * c)};
    
const s = function(array) {return array[r(array.length)]};

const save = function(location, content) {
    fs.writeFile(location, JSON.stringify(content), (err) => {
        if (err) console.log(err)
    });
};

const nameid = function(name) {
    let id2 = name.replace(/[^0-9a-z]/gi, "");
    id = id2.toLowerCase();
};

const refcheck = function(string, method, message) {
    let stringsplit = string.split("^");
    if (stringsplit.length > 1) {
        method(stringsplit, message);
    } else if (method == refreplace) {
        message.reply(string);
    };
};

const referror = function(stringsplit, message) {
    const memory = require("../../memory/"+message.guild.id+".json");
    for (let i = 0; i < stringsplit.length; i++) {
        if (i%2 !== 0) {
            if (memory.tables[stringsplit[i]] == undefined) {
                return message.reply("The table you are referencing between ^^'s doesn't exist, or you have misspelled its name.");
            };
        };
    };
};

const refreplace = function(stringsplit, message) {
    const memory = require("../memory/"+message.guild.id+".json");
    for (let i = 0; i < stringsplit.length; i++) {
        if (i%2 !== 0) {
            let otherresult = memory.tables[stringsplit[i]];
            let spliceentry = s(otherresult.entries).content;
            let start = spliceentry.slice(0, 1);
            let nocaps = start.toLowerCase();
            spliceentry = spliceentry.substr(1);
            let end = spliceentry.slice(-1);
            let nopunct = end.replace(".", "");
            spliceentry = spliceentry.substr(0, spliceentry.length-1);
            stringsplit.splice(i, 1, nocaps+spliceentry+nopunct);
        };
    };
    let final = stringsplit.join("");
    refcheck(final, refreplace, message);
};

module.exports = { d, r, s, save, nameid, refcheck, referror, refreplace };