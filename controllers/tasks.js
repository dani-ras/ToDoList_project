const Task = require('../models/tasks')

async function create(body) {
    return await Task.create(body)
} exports.create = create

async function update(id) {
    const _task = await Task.findOne({ _id: id })
    _task.checked = !_task.checked
    return await Task.findByIdAndUpdate(id, _task, { new: true })
} exports.update = update

async function read() {
    return await Task.find()
} exports.read = read


async function del() {
    return await Task.findByIdAndDelete()
} exports.del = del
