const { Withdraw } = require('../models.js');

const userWithdraw = {

    create: (userId, amount, countRefs) => {
        const newWithdraw = new Withdraw({
            userId,
            amount,
            countRefs,
        });

        newWithdraw.save().then()
    },
    getLast: (userId) => Withdraw.find({ userId })

}

module.exports = userWithdraw