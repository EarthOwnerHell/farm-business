const { myPetLevel } = require("../../keyboards/inline")
const { numberWithSpace } = require('../../tools')

module.exports = async(msg) => {
const { pet, id, petLevel, petExp } = msg.user
if (pet == "None") return msg.send("😫 У вас нет пета! Приобрести пета можно в магазине привилегий.")
const petName = {
"frog": "Лягух",
"fox": "Лиса",
"chick": "Птенец",
"tiger": "Тигр",
"cow": "Коровка",
"pig": "Свинка"
}
const petPercent = {
"frog": 3,
"fox": 7,
"chick": 12,
"tiger": 18,
"cow": 26,
"pig": 35
}
const petPhoto = {
"frog": "photo-211465984_457239049",
"fox": "photo-211465984_457239048",
"chick": "photo-211465984_457239047",
"tiger": "photo-211465984_457239046",
"cow": "photo-211465984_457239045",
"pig": "photo-211465984_457239044"
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
