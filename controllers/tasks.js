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

// @desc    Get all tasks by a user
// @route   GET /api/v1/tasks
// @access  Public
exports.getTasksByUser = async (req, res, next) => {
    try {
        const tasks = await Task.find({"userid": req.params.id});
        
        return res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500).json({
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


// @desc    Update a task
// @route   PUT /api/v1/tasks
// @access  Public
exports.putTask = async (req, res, next) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndUpdate(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Task updated"
        })
    } catch (err) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}


// @desc    Delete tasks
// @route   DELETE /api/v1/tasks/:id
// @access  Public
exports.deleteTasks = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
              message: 'The task was deleted successfully from the database'
            });
            
    } catch (error) {
        return next(err)
    }
}

// @desc    Delete tasks by user
// @route   DELETE /api/v1/tasks/user/:id
// @access  Public
exports.deleteTasksByUser = async (req, res, next) => {
    try {
        const tasks = await Task.remove({"userid": req.params.id});
        return res.status(200).json({
            success: true,
            message: "Delete successful"
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}