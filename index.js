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
      .setImage(helpImg)
      .setAuthor('Vincent HELP', helpImg)
      .setColor('#186de6')
      .setFooter(`Vincent BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!hwid',hwid) {
    let hwid = ''
    let img = 'https://cdn.discordapp.com/attachments/775519421476765748/775656213228290068/1__6_-removebg-preview.png';
    let embed = new Discord.RichEmbed()
      .setTitle('HWID')
      .setThumbnail(img)
      .addBlankField()
      .addField('좀만 기달려주세요 . . .', '곧 하드락이 해제될 것입니다')
      .addBlankField()
      .setTimestamp()
      .setFooter('Made By KADE#7777', img)

    message.channel.send(embed)
  } else if(message.content == '!certified') {
    let Img = 'https://cdn.discordapp.com/attachments/775696488785117216/775696593897914368/411823403469635594.png';
    if(message.channel.type == 'dm') {
      return message.reply(Img);
    }
  } else if(message.content == '!certified') {
      let Img = 'https://cdn.discordapp.com/attachments/775696488785117216/775696596808499210/417492246271623178.png';
      if(message.channel.type == 'dm') {
        return message.reply(Img);
      }
      
      var clearLine = message.content.slice('!청소'.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { 
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
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
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다.");
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