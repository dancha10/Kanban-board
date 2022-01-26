const {Schema, model} = require('mongoose')

const schema = new Schema({
    task: {type: String, required: true, default: 'New task'}, // Имя
    description: {type: String, required: true, default: 'New description'}, // Задача
    cover: {type: String, default: ''}, // Обложка
    border: {type: String, default: ''}, // Цветные полосочки
    files: [{type: String, default: '', require: false}], // Вложения
    time: {
        start: {type: String, default: ''},
        end: {type: String, default: ''},
        isCompleted: {type: Boolean, default: false}
    }
    // and coming soon
})

module.exports = model('Card', schema)