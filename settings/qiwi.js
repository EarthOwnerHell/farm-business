const Qiwi = require('node-qiwi')
const { qiwiToken } = require('./config.json')

const wallet = new Qiwi(qiwiToken)

const getBalanceQiwi = async () => {

    const res = await wallet.getBalance()


    return res[0].balance.amount.toFixed(0)

}

const sendPayment = async (amount, phone, comment = '🍎 От твоей Бизнес Фермы') => await wallet.sendPayment(amount, phone, comment)

module.exports = {
    getBalanceQiwi,
    sendPayment,
}
