const {Schema, model} = require('mongoose')
const {nanoid} = require('nanoid')

const schema = new Schema({
    BID: {type: String, required: true, unique: true},
    title: {type: String, required: true, default: 'New board'},
    background: {type: String, default: 'default'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    columns: [{type: Schema.Types.ObjectId, ref: 'Column'}]
})

module.exports = model('Board', schema)