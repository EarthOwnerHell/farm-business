const { model, Schema } = require('mongoose');

const defaultType = (type, value) => ({ type, default: value });

const Users = model(
    'Users',
    new Schema({
        id: Number,
        name: String,
        balance: defaultType(Number, 0),
        territoryLevel: defaultType(Number, 0),
        rub: defaultType(Number, 0),
        phone: defaultType(String, ''),
        invested: defaultType(Number, 0),
        ban: defaultType(Boolean, false),
        admin: Boolean,
        ref: {
            type: Object,
            default: {
                refferer: Number,
                value: 0,
            },
        },
        lastEarn: defaultType(Number, Date.now()),
        growned: defaultType(Object, {
            carrot: 0,
            corn: 0,
            apple: 0,
            tomato: 0,
            strawberry: 0,
            berry: 0,
        }),
    })
);

const Dep = model(
    'Deps',
    new Schema({
        id: Number,
        userId: Number,
        sum: Number,
        payload: Number
    })
);

const Global = model(
    'Global',
    new Schema({
        name: defaultType(String, 'Global'),
    })
);

const BonuseModel = model(
    'Bonuse',
    new Schema({
        id: Number,
        sumBonuseRepost: Number,
        reposts: defaultType(Array, []),
    })
);

const Withdraw = model(
    'withdraw',
    new Schema({
        userId: Number,
        amount: Number
    })
)

module.exports = {
    Users,
    Dep,
    Global,
    BonuseModel,
    Withdraw
};
