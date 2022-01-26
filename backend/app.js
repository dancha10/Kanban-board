const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/board', require('./routes/board.router'))
app.use('/api/column', require('./routes/column.router'))
app.use('/api/card', require('./routes/card.router'))
app.use('/api/upload', require('./routes/upload.router'))

app.use(require('./middleware/error.middleware'))

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
