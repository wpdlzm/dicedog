const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const prefix = "!" ;
const ch = "775519421476765748" ;
const rr = "775517048909725696" ;
const fs = require('fs');
const verifyj = JSON.parse(fs.readFileSync("./verify.json", "utf8"))

client.on('ready', () => {
  console.log('ON');
  client.user.setPresence({ game: { name: 'LOVE Vincent' }, status: 'online' })
});

client.on('message', async message => {
    let messageArray = message.content.split(" ");
   if(message.content === `${prefix}setcaptcha`) {
        
    let filter = m => m.author.id === message.author.id;
    let ch;
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission').then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    
    message.channel.send(':pencil: **| Now type the verify channel name... :pencil2: **').then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            ch = collected.first().content;
            let chf = message.guild.channels.find('name', `${ch}`)
            if(!chf) return msg.edit(':x: **| Wrong Channel Name (Type The Command Again) .**') && console.log('cant find this channel')
            let rr;
            msg.edit(':scroll: **| Please type verified role name.... :pencil2: **').then(msg => {
      
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    rr = collected.first().content;
                    let rf = message.guild.roles.find('name', `${rr}`)
                    if(!rf) return msg.edit(':x: **| Wrong Role Name (Type The Command Again)**') && console.log('cant find this role')
                    msg.edit('✅ **| Done successfully..  **').then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Done The Captcha Has Been Setup**')
                      .addField('Captcha Channel:', `${ch}`)
                      .addField('Verfied Role:', `${rr}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${client.user.username}`)
                     message.channel.sendEmbed(embed)
    verifyj[message.guild.id] = {
        channel: ch,
        rolev: rr,
        onoff: 'On'
    }
    fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
})
    })
}})             

client.on('message', async message => {

if(message.content == `${prefix}captcha off`) {
    if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
        channel: "Undefined",
        onoff: "Off",
        rolev: "Undefined"
    }
    if(verifyj[message.guild.id].onoff === "Off") return message.channel.send('Already Turned Off !')
verifyj[message.guild.id].onoff = "off"
message.channel.send(':white_check_mark: | Successfully turned off')
fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
}
})


client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.channel.type === 'dm') return;
let rf = message.guild.roles.find('name', `${verifyj[message.guild.id].rolev}`)
 let mem = message.guild.member(message.author)
    if(message.content.startsWith(prefix + 'captcha')) {
        if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
            channel: "Undefined",
            onoff: "Off",
            rolev: "Undefined"
        }
        if(verifyj[message.guild.id].onoff === "Off") return console.log('the command is turned off')
    if(message.channel.name !== verifyj[message.guild.id].channel) return console.log('wrong channel')
      if(mem.roles.has(rf.id)) return message.channel.send(':x: | You Are Already Verfied !')
  const type = require('./verifycodes.json');
  const item = type[Math.floor(Math.random() * type.length)];
  const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
    const embed = new Discord.RichEmbed()
    .setTitle('**You Should Write The Captcha Code In 15 Seconds**')
    .setColor("RANDOM")
    .setImage(`${item.type}`)
     .setFooter('Requested By' + message.author.tag)
    message.channel.sendEmbed(embed).then(() => {
              message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
      .then((collected) => { 
        message.author.send(`**${collected.first().author} successfully you got verfied role :white_check_mark:**`);
      message.channel.send(`**${collected.first().author} successfully you got verfied role :white_check_mark:**`);
                console.log(`[Typing] ${collected.first().author} verfied himself ! .`);
        message.guild.member(collected.first().author).addRole(rf)
        })
                  .catch(collected => {
                  message.author.send('Timeout !')
                              console.log('[Typing] Error: No one type the captcha code.');
                  console.log(collected)

                })
    
    fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
        if (err) console.error(err)
      })
    })
}});                         



client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'test') {
    return message.reply('ok');
  }

  if(message.content == '!help') {
    let helpImg = 'https://cdn.discordapp.com/attachments/775519421476765748/775656213228290068/1__6_-removebg-preview.png';
    let commandList = [
      {name: '!certified', desc: '인증코드 발급'},
      {name: '!invite', desc: '초대코드 발급'},
      {name: '!hwid id pw', desc: 'hwid을 재설정'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setImage(helpImg)
      .setAuthor('Vincent HELP', helpImg)
      .setColor('#186de6')
      .setFooter(`Vincent BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands', commandStr);

    message.channel.send(embed)
   
    } else if(message.content == '!invite') {
      let img = 'https://cdn.discordapp.com/attachments/775519421476765748/775656213228290068/1__6_-removebg-preview.png';
      let embed = new Discord.RichEmbed()
        .addField(' `Invite Code` ', 'https://discord.gg/Guep5nmMaT')
        .setTimestamp()
        .setFooter('Made By KADE#7777', img)
  
      message.channel.send(embed)
    }
});


function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);