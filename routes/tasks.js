const express = require("express");
const router = express.Router();
const { getTasks, getTask, getTasksByUser, addTasks, putTask, deleteTasks, deleteTasksByUser } = require('../controllers/tasks')

router
    .route('/')
    .get(getTasks)
    .post(addTasks)
    

router
    .route('/:id')
    .delete(deleteTasks)

router
    .route('/user/:id')
    .get(getTasksByUser)
    .delete(deleteTasksByUser)

router
    .route('/:id')
    .get(getTask)
    .put(putTask)

module.exports = router;