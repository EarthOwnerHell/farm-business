const { BonuseModel } = require("../models");



const getBonusePost = (id) => BonuseModel.findOne({ id })

const addBonusePost = (id, sumBonuseRepost, active) => {

    const newBonuseModel = new BonuseModel({
        id,
        sumBonuseRepost,
        active
    })

    newBonuseModel.save().then(console.log)

}

const setUnactive = (id) => {
    BonuseModel.findOneAndUpdate({
        id
    }, {
        $set: {
            'active': false
        }
    }).then()
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
    setUnactive
}
