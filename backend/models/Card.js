const {Schema, model} = require('mongoose')

const schema = new Schema({
    cardName: {type: String, required: true, default: 'New card'},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = model('Card', schema)