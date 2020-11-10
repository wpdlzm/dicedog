const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";

client.on('ready', () => {
  console.log('ON');
  client.user.setPresence({ game: { name: 'LOVE Vincent' }, status: 'offline' })
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'test') {
    return message.reply('ok');
  }

  if(message.content == '!help') {
    let helpImg = 'https://cdn.discordapp.com/attachments/775519421476765748/775656213228290068/1__6_-removebg-preview.png';
    let commandList = [
      {name: '!certified', desc: '인증코드 발급'},
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
   
  } else if(message.content == '!certified') {
    let img = 'https://media.discordapp.net/attachments/775696488785117216/775696593897914368/411823403469635594.png';
    let embed = new Discord.RichEmbed()
      .setTitle('Certified Code')
      .setImage(img)
      .setTimestamp()
      .setFooter('Made By KADE#7777')

    message.channel.send(embed)
  } else if(message.content == '!certified') {
    let img = 'https://cdn.discordapp.com/attachments/775696488785117216/775696596808499210/417492246271623178.png';
    let embed = new Discord.RichEmbed()
      .setTitle('Certified Code')
      .setImage(img)
      .setTimestamp()
      .setFooter('Made By KADE#7777')

    message.channel.send(embed)
  }
});


function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);