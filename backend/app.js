const express = require('express')
const mongoose = require('mongoose')
//const WebSocket = require('ws')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//const server = new WebSocket.Server({port: 5001})
const app = express()

app.use(express.json({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/board', require('./routes/board.router'))
app.use('/api/card', require('./routes/card.router'))
app.use('/api/task', require('./routes/task.router'))
app.use('/api/upload', require('./routes/upload.router'))

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bruhello', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(5000, () => console.log('Server has been started...'));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

/*
const Todo = require('./models/Todo');

server.on('connection', ws => {
    console.log('Have connection')
    ws.on('message', async msg => {
        console.log('msg: ', msg)
        const request = JSON.parse(msg.toString());
        console.log(request)
        if (request.type === 'todo') {
            ws.send(JSON.stringify(await Todo.find({})))
        }
        if (request.type === 'add') {
            console.log(request)
            const TodoList = new Todo({task: request.title});
            await TodoList.save();
            ws.send('Element added')
        }
        if (request.type === 'delete') {
            console.log(request.id)
            Todo.findOneAndDelete({_id: request.id}, function (err) {
                if (!err) {
                    console.log('Удалил')
                    ws.send('Element dell')
                }
            })
        }
        if (request.type === 'put') {
            console.log(request.id)
            await Todo.findOneAndUpdate({_id: request.id}, {task: request.title}).exec(function (error, result) {
                if (error) throw error;
                ws.send('Element change')
            })
        }
    })

    ws.on('close', msg => {
        ws.send('Disconnect')
    })
})*/
