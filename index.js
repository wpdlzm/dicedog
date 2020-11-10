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
      {name: '!인증', desc: '인증'},
      {name: '!invite', desc: '초대코드'},
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
   
  } else if(message.content == '!인증') {
    let Img = 'https://cdn.discordapp.com/attachments/775696488785117216/775696593897914368/411823403469635594.png';
    if(message.channel.type == 'dm') {
      return message.reply(Img);
  
  } else if(message.content == '!invite') {
      client.guilds.array().forEach(x => {
        x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
          .then(invite => {
            message.channel.send(invite.url)
          })
          .catch((err) => {
            if(err.code == 50013) {
              message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
            }
        })
      });
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