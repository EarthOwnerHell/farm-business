const { BonuseModel } = require("../models");



const getBonusePost = (id) => BonuseModel.findOne({ id })

const addBonusePost = (id, sumBonuseRepost) => {

    const newBonuseModel = new BonuseModel({
        id,
        sumBonuseRepost,
    })

    newBonuseModel.save().then(console.log)

}

const addUserRepost = (id, userId) => (

    BonuseModel.findOneAndUpdate({
        "id": id
    }, {
        $push: {
            'reposts': userId
        }
    }).then(console.log(`--> Новый репост.\n\nРепостил - https://vk.com/id${userId}`))
    
)

module.exports = {
    getBonusePost,
    addBonusePost,
    addUserRepost,
}