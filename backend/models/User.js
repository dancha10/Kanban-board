const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    generationID: {type: String, required: true, unique: true},
    avatar: {type: String, default: '../man'},
    boards: [{type: Schema.Types.ObjectId, ref: 'Board'}]
})

module.exports = model('User', schema)