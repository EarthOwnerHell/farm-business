const { gameBoard } = require('../keyboards/usual')
const { ChatModel, Users } = require("../database/models");
const { numberWithSpace, formClick } = require("../tools");
const { getCurrentGames, manageBet } = require("./gameManager");
const { getVkNameById } = require('../settings/vk');
const { getUser } = require('../database/manager/user')

async function chatManager(msg) {

  if (['balance', 'activeFree', "bank", 'red', 'black', '1-12', '13-24', '25-36', 'odd', 'even'].includes(msg.messagePayload.command)) return payloadManager(msg);
}


async function payloadManager(msg) {
  const { command } = msg.messagePayload;
   user = await getUser(msg.senderId)
  const commands = {
    'balance': () => msg.reply(`${formClick(msg.senderId, user.name)}, твой баланс: ${numberWithSpace(user.balance)}$`),
    'activeFree': () => {
      ChatModel.findOneAndUpdate({
        id: msg.peerId
      }, {
        $set: {
          isActive: 1
        }
      })
      msg.send('✅ Беседа успешно активирована.\nДля удобной игры назначь бота администратором.\nУдачной игры!', {
        keyboard: gameBoard
      })
    },

  }

  if (commands[command]) {
    return commands[command]()
  }

  let betAmount=0;

  const gameCommands = {
    'bank': () => {
      let currGames = getCurrentGames();
      if (!currGames.length || !currGames.find(g => g.chatId == msg.peerId)) return msg.reply('Сделайте ставку, чтобы начать игру');
      let thisGame = currGames.find(g => g.chatId == msg.peerId);
      let f = [...thisGame.bets]
      const totalSumm = f.map(b=>b.amount).reduce((p,n)=>p+n);
      let readyInfo = `Всего поставлено: ${numberWithSpace(totalSumm)}$.\n\n`;
      const typeNames = {
        'even': 'Чётное',
        'odd': 'нечётное',
        'red': 'красное',
        'black': 'чёрное',
        'intervals': 'промежуток',
        'onNumber': 'число',
        'color': 'цвет'
      }
      let groups = [];
      console.log(thisGame.bets,'ставки');
      thisGame.bets.forEach(bet => {
        if(groups.find(n=>n[0]==bet.type)){
          groups.find(n=>n[0]==bet.type)[1].push(bet)
        }else{
          groups.push([bet.type,[bet]])
        }
        
      });

      console.log('groups',groups);
      groups.forEach(group=>{
        readyInfo+=`Ставки на ${typeNames[group[0]]}:\n`
        group[1].forEach(bet=>{
          readyInfo+=`${formClick(bet.persId,bet.name)}  - ${numberWithSpace(bet.amount)}\n`
        })
      })
      readyInfo+=`\nХэш игры: ${thisGame.winHash.hash}\n\nДо конца ${Math.round(thisGame.last/1000)} сек`;
      console.log(readyInfo);
      msg.send(readyInfo)
    },

    'color': async (color) => {
      msg.send(await manageBet({
        chatId: msg.peerId,
        persId: msg.senderId,
        type: "color",
        value: color,
        amount: betAmount,
      },user.name))
    },

    'interval': async (interval) => {
      console.log(interval);
      return msg.send(await manageBet({
        chatId: msg.peerId,
        persId: msg.senderId,
        type: 'intervals',
        value: interval,
        amount: betAmount,
      },user.name))


    },

    'onNumber': async() => {
      let number = await msg.question('Выбери число от 1 до 29');
      if (!number.text || !/^\d+$/.test(number.text)) {
        return msg.reply('Вы ввели некорректное значение.')
      }
      number = Number(number.text);
      if(number< 0 || number > 29) return;
      return msg.send(await manageBet({
        chatId: msg.peerId,
        persId: msg.senderId,
        type: 'onNumber',
        value: number,
        amount: betAmount,
      },user.name))


    },

    'even': async() => {

      return msg.send(await manageBet({
        chatId: msg.peerId,
        persId: msg.senderId,
        type: 'even',
        amount: betAmount,
      },user.name))


    },

    'odd': async() => {
      return msg.send(await manageBet({
        chatId: msg.peerId,
        persId: msg.senderId,
        type: 'odd',
        amount: betAmount
      },user.name))

    },
  }

  if (command != 'bank') {
    if (!user.balance) {
      return msg.reply('На твоём балансе нет $ для ставки')
    }

    let askBet = await msg.question('Введите сумму для ставки');
    if (!askBet.text || !/^\d+$/.test(askBet.text)) {
      return msg.reply('Вы ввели некорректное значение.')
    }
    if (askBet.text > 20_000_000) return msg.reply('Нельзя сделать ставку больше 20 000 000$')
    if (askBet.text < 0) return msg.reply("Баланс меньше нуля!")
    askBet=Number(askBet.text);
    if(!askBet) return;
    if(askBet>user.balance){
      return msg.reply('На твоём балансе нет такой суммы')
    }
    betAmount=askBet;
  }



  if (command.includes('-')) return gameCommands['interval'](command);
  if (command == 'red' || command == 'black') return gameCommands['color'](command);
  return gameCommands[command]();
}


module.exports = chatManager;
