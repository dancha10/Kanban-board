const {Schema, model} = require('mongoose')

const schema = new Schema({
    ColumnTitle: {type: String, required: true, default: 'TODO'},
    cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
})

module.exports = model('Column', schema)