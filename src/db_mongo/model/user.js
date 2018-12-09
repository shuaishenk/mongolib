const conn = global[Symbol.for('conn')];
const mongoose = conn.conn;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema({
    _id: ObjectId,
    name: String,
    fullName: String,
    accountId: ObjectId,
})



module.exports = mongoose.model('User', UserSchema, 'user');
