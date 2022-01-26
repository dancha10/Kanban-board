const {Schema, model} = require('mongoose')

const schema = new Schema({
    UID: {type: String, required: true, unique: true}, // TODO on future
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    generationID: {type: String, required: true, unique: true},
    avatar: {type: String},
    boards: [{type: Schema.Types.ObjectId, ref: 'Board'}]
})

module.exports = model('User', schema)