const { myPetLevel } = require("../../keyboards/inline")
const { numberWithSpace } = require('../../tools')

module.exports = async(msg) => {
const { pet, id, petLevel, petExp } = msg.user
if (pet == "None") return msg.send("😫 У вас нет пета! Приобрести пета можно в магазине привилегий.")
const petName = {
"rabbit": "Кролик",
"coala": "Коала",
"penguin": "Пингвин",
"cat": "Котик",
"dog": "Собака",
"deer": "Оленёнок"
}
const petPercent = {
"rabbit": 3,
"coala": 12,
"penguin": 18,
"cat": 35,
"dog":  26,
"deer": 7
}
const petPhoto = {
"rabbit": "photo-209099203_457288732",
"coala": "photo-209099203_457288734",
"penguin": "photo-209099203_457288735",
"cat": "photo-209099203_457288737",
"dog": "photo-209099203_457288736",
"deer": "photo-209099203_457288733"
}

return msg.send
(`
✏️ Имя: ${petName[pet]} 

🔥 Уровень: ${petLevel}
⭐️ Опыт: ${petExp}/${petLevel == 0 ? "300" : petLevel == 1 ? "600" : petLevel == 2 ? "900" : petLevel == 3 ? "1200" : petLevel == 4 ? "1500" : petLevel == 5 ? "1800" : petLevel == 6 ? "2100" : petLevel == 7 ? "2400" : petLevel == 8 ? "2700" : petLevel == 9 ? "3000" : "3300" } EXP

🚀 Бонус: +${petPercent[pet] + (petLevel * 2)}% к доходу

✨ Цена следующего
улучшения: ${numberWithSpace((petExp * 100) + 50000)} $

`, { attachment: petPhoto[pet], keyboard: myPetLevel })
}
