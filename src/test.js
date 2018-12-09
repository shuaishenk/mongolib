const conn = global[Symbol.for('conn')];
const mongoose = conn.conn;

const UserModel = require('./db_mongo/model/user.js');
const AccountModel = require('./db_mongo/model/account.js');

const ObjectId = mongoose.Types.ObjectId;

const addAccount = async () => {
    console.log({ ObjectId })
    let id = new ObjectId;
    console.log({ id })
    const account = new AccountModel({
        _id: id,
        name: 'testAccount',
        fullName: 'testAccount'
    });
    let saveRes = await account.save();
    console.log(saveRes)
}

const deleteAccount = async (opt = {}) => {
    const delRes = await AccountModel.deleteMany(opt)
    console.log({ delRes })
}

const getAccount = async (opt = {}) => {
    // let findRes = await AccountModel.find(opt);
    // console.log({ findRes })
    let whereRes = await AccountModel.where(opt);
    console.log({ whereRes })
}

const updateAccount = async (where = {}, opt = {}) => {
    let updateRes = await AccountModel.where(where).updateMany(opt)
    console.log({ updateRes })
}

const init = async () => {
    try {
        // await addAccount();
        await getAccount({ _id: '5c0d0b81aec3fe2bd828014b' });
        // await updateAccount({ _id: '5c0d0b81aec3fe2bd828014b' }, { name: 'updateAccount' });
        // await deleteAccount({ _id: '5c0d0b81aec3fe2bd828014b' });
    } catch (e) {
        console.error(e)
    }
}



module.exports = init;