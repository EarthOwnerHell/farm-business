const { Withdraw } = require('../models.js');

const userWithdraw = {

    create: (userId, amount) => {
        const newWithdraw = new Withdraw({
            userId,
            amount,
        });

        newWithdraw.save().then()
    },
    getLast: (userId) => Withdraw.find({ userId })

}

module.exports = userWithdraw