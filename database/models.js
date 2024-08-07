const { model, Schema } = require('mongoose');

const defaultType = (type, value) => ({ type, default: value });

const Users = model(
    'Users',
    new Schema({
        id: {
            type: Number,
            index: true
        },
        name: String,
        balance: defaultType(Number, 1000000000),
        rubBalance: defaultType(Number, 0),
        phone: defaultType(String, ''),
        invested: defaultType(Number, 0),
        forTopSymbol: defaultType(String, ""),
        tolyaGiveHimDollars: defaultType(Boolean, false),
        banWithdrawn: defaultType(Boolean, false),
        withdrawnBalance: defaultType(Number, 0),
        privilege: defaultType(String, "None"),
        lastGet: defaultType(Number, Date.now() - 86500000),
        avatar: defaultType(Number, 0),
        ban: defaultType(Boolean, false),
        banTranslation: defaultType(Boolean, false),
        admin: Boolean,
        pet: defaultType(String, "None"),
        petLevel: defaultType(Number, 0),
        petExp: defaultType(Number, 0),
        ref: {
            type: Object,
            default: {
                refferer: Number,
                value: 0,
            },
        },
        lastEarn: defaultType(Number, Date.now()),
        businesses: defaultType(Object, {
            market: 0,
            hospital: 0,
            motel: 0,
            theatre: 0,
            hotel: 0,
            airoport: 0,
        }),
    })
);

const Dep = model(
    'Deps',
    new Schema({
        id: Number,
        userId: Number,
        sum: Number,
    })
);

const rubDep = model(
     "RubDeps",
     new Schema({
         id: Number, 
         userId: Number,
         sum: Number
      })
);

const Global = model(
    'Global',
    new Schema({
        name: defaultType(String, 'Global'),
        percentCourse: defaultType(Number, 1.5),
        buyCourse: defaultType(Number, 16000),
        forRef: defaultType(Number, 33000)
    })
);

const BonuseModel = model(
    'Bonuse',
    new Schema({
        id: Number,
        sumBonuseRepost: Number,
        reposts: defaultType(Array, []),
        active: Boolean
    })
);

const Withdraw = model(
    'withdraw',
    new Schema({
        userId: Number,
        amount: Number,
        countRefs: Number,
    })
)

module.exports = {
    Users,
    Dep,
    Global,
    BonuseModel,
    Withdraw,
    rubDep
};
