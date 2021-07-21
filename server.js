const { v4: uuidv4 } = require('uuid');
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')

const deflist = [
    {
        task: "task1",
        checked: false,
        id: uuidv4()
    }
]

if (!fs.existsSync('list.json')) {
    fs.writeFileSync('list.json', JSON.stringify(deflist))
}
let list //= require('./list.json')


app.use(cors())
app.use(express.json())



function Task(task) { // NEW task constructor function
    this.task = task
    this.checked = false
    this.id = uuidv4() //`d${list.length}`
}

app.get('/task', function (req, res) { // READ tasks from list
    list = require('./list.json')
    if (req.query.id) {
        res.send(list.find(cTask => cTask.id == req.query.id))
    } else {
        res.send(//'tasks presented:\n' +
            // JSON.stringify(list)
            list
        )
    }
})

app.post('/task', function (req, res) { // CREATE new task and add to list
    list = require('./list.json')
    //// //// //// way1
    // let ntask = req.body.task,
    // nchecked = req.body.checked,
    // nid = `d${list.length}`
    // list.push({task:ntask,checked:nchecked,id:nid})
    //// //// //// way2
    // let ntask = req.body
    // list.push(ntask)
    //// //// //// way3
    list.push(new Task(req.body.task))
    fs.writeFileSync('list.json', JSON.stringify(list))

    res.send(//'task added\n' + JSON.stringify(
        list
        // )
    )
})

app.put('/task', function (req, res) { // UPDATE state of task in list
    list = require('./list.json')
    let cTask = list.find(t => t.id == req.body.id)
    cTask.checked = !cTask.checked
    fs.writeFileSync('list.json', JSON.stringify(list))
    res.send(
        list
    )
})

app.delete('/task/:id', function (req, res) { // REMOVE task from list
    list = require('./list.json')
    let cTask = list.find(t => t.id == req.params.id)
    list.splice(list.indexOf(cTask), 1)
    fs.writeFileSync('list.json',JSON.stringify(list))
    res.send(list)
})

app.listen(3000)