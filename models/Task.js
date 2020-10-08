const mongoose = require('mongoose');

// descriptiostate (to userid

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    userid: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema)