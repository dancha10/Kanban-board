const {Router} = require('express');
const router = Router();

const authMiddleware = require('../middleware/auth.middleware')

const Board = require('../models/Board')
const Card = require('../models/Card')

router.post('/create', authMiddleware, async (request, response) => {
    try {
        const {boardID, cardName} = request.body // Прилетает id доски 61d979ed9fc4160686401f39

        const card = await Card.create({cardName})

        const searchBoard = await Board.findById({_id: boardID})

        if (!searchBoard) return response.status(400).json({message: 'Такой доски нет в базе'})

        await Board.findOneAndUpdate({_id: boardID}, {
            $push: {
                cards: [card]
            }
        })

        response.status(201).json({message: 'Карточка создана'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

router.put('/change', authMiddleware, async (request, response) => {
    try {
        const {cardID, newCardName} = request.body // Прилетает id карточки 61dc36657aefd243fbad21ec

        const searchCard = await Card.findById({_id: cardID})
        if (!searchCard) return response.status(400).json({message: 'Такой карточки нет в базе'})

        await Card.findOneAndUpdate({_id: cardID}, {cardName: newCardName})
        response.status(201).json({message: 'Карточка обновлена'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

router.delete('/delete', authMiddleware, async (request, response) => {
    try {
        const {cardID} = request.body // Прилетает id карточки 61dc6c0032d3f15f3d81e3a6

        const searchCard = await Card.findById({_id: cardID})
        if (!searchCard)
            return response.status(400).json({message: 'Такой карточки нет в базе'})

        await Card.findByIdAndDelete({_id: cardID})
        await Board.findOneAndUpdate({cards: {$elemMatch: {$in: cardID}}}, {
            $pull: {cards: cardID}
        })
        response.status(201).json({message: 'Карточка удалена'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

module.exports = router;