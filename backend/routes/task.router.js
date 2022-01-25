const {Router} = require('express');
const router = Router();

const authMiddleware = require('../middleware/auth.middleware')

const Task = require('../models/Task')
const Card = require('../models/Card')
// /api/task/create
router.post('/create', authMiddleware, async (request, response) => {
    try {
        //console.log(request.file.path)
        //console.log(request.body)
        const {cardID, taskName, problem, cover, tags, files, start, end, isCompleted} = request.body
        const task = await Task.create({
            taskName,
            problem,
            cover,
            tags: [...tags],
            files: [...files],
            'time.start': start,
            'time.end': end,
            'time.isCompleted': isCompleted
        })
        const searchBoard = await Card.findById({_id: cardID})
        if (!searchBoard) return response.status(400).json({message: 'Такой доски нет в базе'})

        await Card.findOneAndUpdate({_id: cardID}, {
            $push: {
                tasks: [task]
            }
        })

        response.status(201).json({message: 'Задача создана'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

// /api/task/change
router.post('/change', authMiddleware, async (request, response) => {
    try {
        const {taskID, newTaskName, newProblem, newCover, newTags, newFiles} = request.body
        const newTask = await Task.findOneAndUpdate({_id: taskID}, {
            $set: {
                taskName: newTaskName, problem: newProblem, cover: newCover, tags: [...newTags], files: [...newFiles]
            }
        })
        const searchTask = await Task.findById({_id: taskID})
        if (!searchTask) return response.status(400).json({message: 'Такой задачки нет в базе'})

        response.status(201).json({message: 'Задача update'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

// /api/task/delete
router.delete('/delete', authMiddleware, async (request, response) => {
    try {
        const {taskID} = request.body

        const searchTask = await Task.findById({_id: taskID})
        if (!searchTask)
            return response.status(400).json({message: 'Такой таски нет в базе'})

        await Task.findByIdAndDelete({_id: taskID})
        await Card.findOneAndUpdate({tasks: {$elemMatch: {$in: taskID}}}, {
            $pull: {tasks: taskID}
        })
        response.status(201).json({message: 'Task delete'});
    } catch (e) {
        response.status(500).json({message: 'Что-то пошло не так...'});
    }
})

module.exports = router;