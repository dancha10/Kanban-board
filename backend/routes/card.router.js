const {Router} = require('express');
const router = Router();

const auth = require('../middleware/auth.middleware')

const Card = require('../models/Card')
const Column = require('../models/Column')

const ApiError = require('../exceptions/ApiError')

// /api/card/create
router.post('/create', auth, async (request, response, next) => {
    try {
        // TODO FILES !!!! NENODELANNIY
        // TODO VSE PEREDELAT SROCHNO
        // VSE GOVNO
        console.log(request.body)
        const {CID, task, description, cover, border, files, start, end, isCompleted} = request.body
        const card = await Card.create({
            task,
            description,
            cover,
            border,
            files: [...files],
            'time.start': start,
            'time.end': end,
            'time.isCompleted': isCompleted
        })
        const searchColumn = await Column.findById({_id: CID})
        if (!searchColumn) throw ApiError.NotFound('Column')

        await Column.findOneAndUpdate({_id: CID}, {
            $push: {
                cards: [card]
            }
        })

        response.status(201).json({message: 'Card created'});
    } catch (e) {
        next(e)
    }
})

// /api/task/change
router.post('/change/:id', auth, async (request, response, next) => {
    try {
        const CardID = request.params.id
        const {newTask, newDescription, newCover, newBorder, newFiles} = request.body

        const searchCard = await Card.findById({_id: CardID})
        if (!searchCard) throw ApiError.NotFound('Card')

        await Card.findOneAndUpdate({_id: CardID}, {
            $set: {
                task: newTask, description: newDescription, cover: newCover, border: newBorder, files: [...newFiles]
            }
        })

        response.status(200).json({message: 'Card update'});
    } catch (e) {
        next(e)
    }
})

// /api/task/delete
router.delete('/delete/:id', auth, async (request, response, next) => {
    try {
        const CardID = request.params.id

        const searchCard = await Card.findById({_id: CardID})
        if (!searchCard) throw ApiError.NotFound('Card')

        await Card.findByIdAndDelete({_id: CardID})
        await Column.findOneAndUpdate({cards: {$elemMatch: {$in: CardID}}}, {
            $pull: {cards: CardID}
        })
        response.status(200).json({message: 'Card delete'});
    } catch (e) {
        next(e)
    }
})

module.exports = router;