const {Router} = require('express');
const router = Router();

const auth = require('../middleware/auth.middleware')

const Board = require('../models/Board')
const Column = require('../models/Column')

const ApiError = require('../exceptions/ApiError')

// api/column/create
router.post('/create', auth, async (request, response, next) => {
    try {
        const {BID, title} = request.body // BID - Board ID

        const column = await Column.create({ColumnTitle: title})

        const searchBoard = await Board.findOne({BID})

        if (!searchBoard) throw ApiError.NotFound('This board')

        await Board.findOneAndUpdate({BID}, {
            $push: {
                columns: [column]
            }
        })
        response.status(201).json({message: 'Column create'});
    } catch (e) {
        next(e)
    }
})

// api/column/change/:id
router.put('/change/:id', auth, async (request, response, next) => {
    try {
        const {newTitle} = request.body
        const CID = request.params.id // CID - Column ID
        const searchColumn = await Column.findById({_id: CID})
        if (!searchColumn) throw ApiError.NotFound('Column')

        await Column.findOneAndUpdate({_id: CID}, {ColumnTitle: newTitle})
        response.status(200).json({message: 'Column update'});
    } catch (e) {
        next(e)
    }
})

// api/column/delete/:id
router.delete('/delete/:id', auth, async (request, response, next) => {
    try {
        const CID = request.params.id

        const searchColumn = await Column.findById({_id: CID})
        if (!searchColumn) throw ApiError.NotFound('Column')

        await Column.findByIdAndDelete({_id: CID})
        await Board.findOneAndUpdate({columns: {$elemMatch: {$in: CID}}}, {
            $pull: {columns: CID}
        })
        response.status(200).json({message: 'Column removed'});
    } catch (e) {
        next(e)
    }
})

module.exports = router;