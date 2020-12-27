const Discord = require("discord.js");
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

//"; console.log("hello world"); "
// or ' or `



module.exports = { d, r, s, save, nameid };