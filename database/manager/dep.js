const { formClick } = require("../../tools");
const { Dep } = require("../models");



const getDep = (id) => Dep.findOne({ id }, { _id: 0, userId: 0, sum: 0 })

const newDep = (props) => {

    const { id, userId, sum } = props

    const addDep = new Dep({
        id,
        userId,
        sum
    })

    addDep.save().then(console.log(`--> Новый деп от: https://vk.com/id${userId}\nсумма: ${sum}`))

}

module.exports = {
    getDep,
    newDep,
}