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

const refcheck = function(object, string, method, message) {
    let stringsplit = string.split("^");
    if (stringsplit.length > 1) {
        method(object, stringsplit, message);
    } else if (method == refreplace) {
        message.reply(string);
    };
};

const referror = function(object, stringsplit, message) {
    const memory = require("../../memory/"+message.guild.id+".json");
    for (let i = 0; i < stringsplit.length; i++) {
        if (i%2 !== 0) {
            if (memory.tables[stringsplit[i]] == undefined) {
                return message.reply("The table you are referencing between ^^'s doesn't exist, or you have misspelled its name.");
            };
        };
    };
};

const refreplace = function(object, stringsplit, message) {
    const memory = require("../memory/"+message.guild.id+".json");
    if ("nocaps" in object.tags && "nopunct" in object.tags) { 
        console.log("nocaps nopunct");
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
    } else if (object.tags.nocaps !== undefined) {
        console.log("nocaps");
        for (let i = 0; i < stringsplit.length; i++) {
            if (i%2 !== 0) {
                let otherresult = memory.tables[stringsplit[i]];
                let spliceentry = s(otherresult.entries).content;
                let start = spliceentry.slice(0, 1);
                let nocaps = start.toLowerCase();
                spliceentry = spliceentry.substr(1);
                stringsplit.splice(i, 1, nocaps+spliceentry);
            };
        };
    } else if (object.tags.nopunct !== undefined) {
        console.log("nopunct");
        for (let i = 0; i < stringsplit.length; i++) {
            if (i%2 !== 0) {
                let otherresult = memory.tables[stringsplit[i]];
                let spliceentry = s(otherresult.entries).content;
                let end = spliceentry.slice(-1);
                let nopunct = end.replace(".", "");
                spliceentry = spliceentry.substr(0, spliceentry.length-1);
                stringsplit.splice(i, 1, spliceentry+nopunct);
            };
        };
    } else {
        console.log("nothing");
        for (let i = 0; i < stringsplit.length; i++) {
            if (i%2 !== 0) {
                let otherresult = memory.tables[stringsplit[i]];
                let spliceentry = s(otherresult.entries).content;
                stringsplit.splice(i, 1, spliceentry);
            };
        };
    };
    console.log("this should happen last");
    let final = stringsplit.join(""); //may need to await
    refcheck(object, final, refreplace, message);
};

module.exports = { d, r, s, save, nameid, refcheck, referror, refreplace };