const express = require("express");
const router = express.Router();
const { getTasks, getTask, addTasks, deleteTasks } = require('../controllers/tasks')

router
    .route('/')
    .get(getTasks)
    .post(addTasks)
    

router
    .route('/:id')
    .delete(deleteTasks)

router
    .route('/:id')
    .get(getTask)

module.exports = router;