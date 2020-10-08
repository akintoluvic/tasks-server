const Task = require('../models/Task')

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        })
    } catch (err) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: task
        })
    } catch (err) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add tasks
// @route   POST /api/v1/tasks
// @access  Public
exports.addTasks = async (req, res, next) => {
    try {
        const {description, state, userid } = req.body;

        const task = await Task.create(req.body);
        return res.status(201).json({
            success: true,
            data: task
        })
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.send(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}


// @desc    Delete tasks
// @route   DELETE /api/v1/tasks/:id
// @access  Public
exports.deleteTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!transaction) {
            res.status(404).json({
                success: false,
                error: 'Task does not exist'
            })
        } 
        await task.remove();
        return res.status(200).json({
            success: true,
            data: []
        })
    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}