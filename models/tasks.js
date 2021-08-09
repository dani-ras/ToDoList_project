const mongoose = require('mongoose')
const { Schema, model } = mongoose

const taskSchema = new Schema({
    text: { type: String, trim: true, minLength: 1, required: true },
    checked: { type: Boolean, default: false }
})

const taskModel = model('task', taskSchema)
module.exports = taskModel