const { v4: uuidv4 } = require('uuid');
const express = require('express')
const cors = require('cors')
const app = express()

const list = [
    {
        task: "task1",
        checked: false,
        id: uuidv4()
    }
]

app.use(cors())
app.use(express.json())



function Task(task) { // NEW task constructor function
    this.task = task
    this.checked = false
    this.id = uuidv4() //`d${list.length}`
}

app.get('/task', function (req, res) { // READ tasks from list
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
    // console.log(req.body.task)
    res.send(//'task added\n' + JSON.stringify(
        list
        // )
    )
})

app.put('/task', function (req, res) { // UPDATE state of task in list
    let cTask = list.find(t => t.id == req.body.id)
    cTask.checked = !cTask.checked
    res.send(//'task updated\n' + JSON.stringify(
        list
        // )
    )
})

app.delete('/task/:id', function (req, res) { // REMOVE task from list
    let cTask = list.find(t => t.id == req.params.id)
    // console.log(req.params)
    // console.log(cTask);
    list.splice(list.indexOf(cTask), 1)
    // res.send(//'task deleted\n' + JSON.stringify(
        // )
        res.send(list)
        // console.log(list);
        // )
    })
    // app.get('/task', function (req, res) {
    //     res.send(list);})

app.listen(3000)