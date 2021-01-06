const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

function r(c){
    return Math.floor(Math.random() * c);
};

function s(array) {
    return array[r(array.length)];
}

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const modules = ['edit','export','tables','view'];

modules.forEach(c => {

    fs.readdir(`./commands/${c}`, (err, files) => {

        if(err) console.log(err);

        console.log(`[Commandlogs] Loaded ${files.length} commands of modules ${c}`);

        files.forEach(f => { 
            const props = require(`./commands/${c}/${f}`); 
            bot.commands.set(props.config.name, props); 
            props.config.aliases.forEach(alias => { 
                bot.aliases.set(alias, props.name); 
            });
        });
    });

});

bot.on("ready", () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Self-Actualization", {type: ""});
});

bot.on("guildCreate", guild => {
    if (!fs.existsSync(`./memory/${guild.id}.json`)) {
        fs.writeFile(`./memory/${guild.id}.json`, `{"settings":{},"tables":{}}`, (err) => {
            if (err) console.log(err)
        });
    };
});

bot.on("message", async message => {

    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    /*const channelmemory = require(`./memory/${guild.id}.json`);
    if(channelmemory.settings.channelid !== undefined && message.channel.id !== channelmemory.settings.channelid) return;*/

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

bot.login(botsettings.token);