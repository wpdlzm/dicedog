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
      {name: '!certified', desc: '인증'},
      {name: '!hwid id pw', desc: '24시간마다 hwid를 재설정'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Vincent HELP', helpImg)
      .setColor('#186de6')
      .setFooter(`Vincent BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == 'd!애쉬') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `애쉬` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  } else if(message.content == 'd!맥크리') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `맥크리` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  } else if(message.content == 'd!위도우') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `위도우메이커` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  } else if(message.content == 'd!겐지') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `겐지` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  } else if(message.content == 'd!트레') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `트레이서` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  } else if(message.content == 'd!한조') {
    let img = 'https://cdn.discordapp.com/attachments/767267369503948851/775003422217863168/DICE.png';
    let img1 = '';
    let embed = new Discord.RichEmbed()
      .setTitle(' `한조` ')
      .setThumbnail(img)
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

    message.channel.send(embed)
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
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