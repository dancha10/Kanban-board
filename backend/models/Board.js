const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, default: 'New board'},
    background: {type: String, default: 'default'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
})

module.exports = model('Board', schema)