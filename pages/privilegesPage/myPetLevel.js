const { plusBalanceUser, editPetExp, editPetLevel } = require("../../database/manager/user")
const { numberWithSpace } = require('../../tools')

module.exports = async(msg) => {

const { id, petExp, petLevel, balance } = msg.user
let sumForImprove = (petExp * 100) + 50000
if (petExp == 0) sumForImprove = 50000
if (sumForImprove > balance && id != 297789589) return msg.send("😫 Недостаточный баланс для улучшения пета")
if (petLevel == 10) return msg.send("🥰 Ваш пет максимального уровня")
plusBalanceUser(id, -sumForImprove)
if ((petExp + 50) == 300 || (petExp + 50) == 600 || (petExp + 50) == 900 || (petExp + 50) == 1200 || (petExp + 50) == 1500 || (petExp + 50) == 1800 || (petExp + 50) == 2100 || (petExp + 50) == 2400 || (petExp + 50) == 2700 || (petExp + 50) == 3000 || (petExp + 50) == 3300){
  msg.send(`😍 Уровень пета повышен до ${petLevel + 1}\n\n✅ Доход вырос на 2%`)
  editPetLevel(id, 1)
  
}
editPetExp(id, 50)
return msg.send(`✔️ Вы улучшили пета (+50 EXP)\n\n💴 С баланса списано ${numberWithSpace(sumForImprove)} 🌾`)
}
