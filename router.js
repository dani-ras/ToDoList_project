const task = require('./controllers/tasks')

module.exports = function Router(app) {

    app.post('/tasks', async function (req, res) {

        const _task = await task.create(req.body)
        res.send(_task)
        // res.send(req.body)
    })

    app.put('/tasks/:id', async function (req, res) {
        const id = req.params.id
        const newData = req.body
        const _task = await task.update(id, newData)
        res.send(_task)
    })

    app.get('/tasks', async function (req, res) {
        const _task = await task.read()
        res.send(_task)
    })

    app.delete('/tasks', async function (req, res) {
        const _task = await task.del()
        res.send(_task)
    })

}