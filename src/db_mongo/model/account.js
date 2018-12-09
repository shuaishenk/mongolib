const conn = global[Symbol.for('conn')];
const mongoose = conn.conn;
const ObjectId = mongoose.Schema.Types.ObjectId;

const AccountSchema = mongoose.Schema({
    _id: ObjectId,
    name: String,
    fullName: String
})



module.exports = mongoose.model('Account', AccountSchema, 'account');
