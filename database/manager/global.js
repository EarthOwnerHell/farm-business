const { Global, Users } = require("../models")


const getGlobal = (name = 'Global') => Global.findOne({ name })


const autoCreateGlobal = async () => {

    const global = await getGlobal()

    if (global) return
    
    const newGlobal = new Global({ })

    newGlobal.save().then(console.log)

}

const setNewPercent = (percent) => (
    Global.findOneAndUpdate({
        name: 'Global'
    }, {
        $set: {
            'percentCourse': percent
        }
    }).then(console.log(`--> SCAMMING SHIIIT Сменили процент на ${percent}`))
)

const setBuyCourse = (value) => {
    Global.findOneAndUpdate({
        name: 'Global'
    }, {
        $set: {
            'buyCourse': value
        }
    }).then()
}

module.exports = {
    getGlobal,
    autoCreateGlobal,
    setNewPercent,
    setBuyCourse,
};