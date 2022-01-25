const {Schema, model} = require('mongoose')

const schema = new Schema({
    taskName: {type: String, required: true, default: 'New task'}, // Имя
    problem: {type: String, required: true, default: 'New task'}, // Задача
    cover: {type: String, default: ''}, // Обложка
    tags: [{type: String, default: ''}], // Цветные полосочки
    files: [{type: String, default: ''}], // Вложения
    time: {
        start: {type: String, default: ''},
        end: {type: String, default: ''},
        isCompleted: {type: Boolean, default: false}
    }
    // and coming soon
})

module.exports = model('Task', schema)