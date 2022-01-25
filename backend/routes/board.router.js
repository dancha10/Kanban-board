const {Router} = require('express');
const router = Router();

const Board = require('../models/Board')
const User = require('../models/User')

const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, async (request, response) => {
    try {
        const boards = await Board.find({users: {$elemMatch: {$in: request.user.userID}}})
            .populate({
                path: 'cards',
                populate: {
                    path: 'tasks',
                    model: 'Task'
                }
            }).populate('users', 'avatar nickname')
        if (!boards) return response.status(400).json({message: 'Досок нет'})
        response.json(boards)
    } catch (e) {
        response.status(500).json({message: 'Почему-то доски не вывелись...'});
    }
})

router.post('/create', authMiddleware, async (request, response) => {
    try {
        console.log(request.user.userID)
        const {title, background} = request.body
        await Board.create({title, background, owner: request.user.userID, users: [request.user.userID]}) // TODO мб убрать дублирование одинаковых айдишников
        response.status(201).json({message: 'Доска создана'});
    } catch (e) {
        response.status(500).json({message: 'Почему-то доска не добавилась...'});
    }
})

router.put('/change', authMiddleware, async (request, response) => {
    try {
        const {boardID, newTitle, newBackground} = request.body // Прилетает id доски 61d979ed9fc4160686401f39

        const isOwner = await Board.findOne({_id: boardID})
        if (isOwner.owner != request.user.userID) return response.status(400).json({message: 'Вы не создатель доски'})

        await Board.findOneAndUpdate({_id: boardID}, {
            $set: {
                "title": newTitle,
                "background": newBackground
            }
        })
        response.status(201).json({message: 'Изменения применены'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

//#HcLtY

router.post('/invite', authMiddleware, async (request, response) => {
    try {
        const {generationID} = request.body
        const candidate = await User.findOne({generationID})

        if (!candidate)
            return response.status(400).json({message: 'Такого пользователя не существует'})

        await Board.findOneAndUpdate({users: [request.user.userID]}, {
            $push: {
                users: candidate._id
            }
        })
        response.status(201).json({message: 'Пользователь добавлен'})
    } catch (e) {
        response.status(500).json({message: 'Почему-то пользователь не приглашен...'});
    }
})

router.delete('/delete', authMiddleware, async (request, response) => {
    try {
        const {boardID} = request.body // Прилетает id

        const searchBoard = await Board.findById({_id: boardID})
        if (!searchBoard)
            return response.status(400).json({message: 'Такой доски нет в базе'})

        await Board.findByIdAndDelete({_id: boardID})
        response.status(201).json({message: 'Доска удалена'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

module.exports = router;