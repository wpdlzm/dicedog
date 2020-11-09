const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";

client.on('ready', () => {
  console.log('ON');
  client.user.setPresence({ game: { name: 'd!help' }, status: 'online' }),
  client.user.setPresence({ game: { name: '모든문의는 KADE#7777' }, status: 'online' })
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'test') {
    return message.reply('ok');
  }

  if(message.content == 'd!help') {
    let img = 'https://cdn.discordapp.com/attachments/773839697985667094/775173348971118632/DICE_HELP.PNG';
    let embed = new Discord.RichEmbed()
      .setTitle('DICE 꿀값봇 명령어')
      .setImage(img)
      .addBlankField()
      .setTimestamp()
      .setFooter('Made by KADE')

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