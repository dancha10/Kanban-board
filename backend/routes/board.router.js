const {Router} = require('express');
const router = Router();

const {nanoid} = require("nanoid");

const Board = require('../models/Board')
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const ApiError = require('../exceptions/ApiError')

// TODO mb delete useless!!!
router.get('/', auth, async (request, response, next) => {
    try {
        const boards = await Board.find({users: {$elemMatch: {$in: request.user.userID}}}).select('BID title background')
        if (!boards) throw ApiError.NotFound('Boards')
        response.json(boards)
    } catch (e) {
        next(e)
    }
})

// api/board/id
router.get('/:id', auth, async (request, response, next) => {
    try {
        const board = await Board.findOne({BID: request.params.id}).populate({
            path: 'columns',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        }).populate('users', 'avatar nickname')
        if (!board) throw ApiError.NotFound('Boards')
        response.json(board)
    } catch (e) {
        next(e)
    }
})

// api/board/create
router.post('/create', auth, async (request, response, next) => {
    try {
        console.log(request.user.userID)
        const {title, background} = request.body
        const BID = nanoid(8)
        await Board.create({BID, title, background, owner: request.user.userID, users: [request.user.userID]}) // TODO мб убрать дублирование одинаковых айдишников
        response.status(201).json({message: 'Board created'});
    } catch (e) {
        next(e)
    }
})

// api/board/change/id
router.put('/change/:id', auth, async (request, response, next) => {
    try {
        const {newTitle, newBackground} = request.body // Прилетает id доски 61d979ed9fc4160686401f39

        const isOwner = await Board.findOne({BID: request.params.id})
        if (isOwner.owner != request.user.userID) throw ApiError.BadRequest('You are not the creator of the board')

        await Board.findOneAndUpdate({_id: request.params.id}, {
            $set: {
                "title": newTitle,
                "background": newBackground
            }
        })
        response.status(201).json({message: 'Changes applied'});
    } catch (e) {
        next(e)
    }
})

// api/board/invite
router.post('/invite', auth, async (request, response, next) => {
    try {
        const {generationID} = request.body
        const candidate = await User.findOne({generationID})

        if (!candidate) throw ApiError.BadRequest(404, 'This user does not exist')

        await Board.findOneAndUpdate({users: [request.user.userID]}, {
            $push: {
                users: candidate._id
            }
        })
        response.status(201).json({message: 'User added'})
    } catch (e) {
        next(e)
    }
})

router.delete('/delete/:id', auth, async (request, response, next) => {
    try {// Прилетает id
        const searchBoard = await Board.findOne({BID: request.params.id})
        if (!searchBoard) throw ApiError.NotFound('This board')

        await Board.findOneAndDelete({BID: request.params.id})
        response.status(201).json({message: 'Board removed'});
    } catch (e) {
        next(e)
    }
})

module.exports = router;