require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')

if (!fs.existsSync('list.json')) {
    const deflist = [
        {
            task: "task1",
            checked: false,
            id: uuidv4()
        }
    ]

    fs.writeFileSync('list.json', JSON.stringify(deflist))
}

app.use(express.static('client'))

let list //= require('./list.json')


//app.use(cors()) //access through browser // // // start through 'node .'. NOT npm start (nodemon).
app.use(express.json())



function Task(task) { // NEW task constructor function
    this.task = task
    this.checked = false
    this.id = uuidv4() //`d${list.length}`
}

app.get('/task', function (req, res) { // READ tasks from list
    list = require('./list.json')
    res.send(list)
    // if (req.query.id) {
    //     res.send(list.find(cTask => cTask.id == req.query.id))
    // } else {
    //     res.send(//'tasks presented:\n' +
    //         // JSON.stringify(list)
    //         list
    //     )
    // }
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
    fs.writeFileSync('list.json', JSON.stringify(list, null, 4))

    res.send(
        list
    )
})

app.put('/task', function (req, res) { // UPDATE state of task in list
    list = require('./list.json')
    let cTask = list.find(t => t.id == req.body.id)
    cTask.checked = !cTask.checked
    fs.writeFileSync('list.json', JSON.stringify(list, null, 4))
    res.send(
        list
    )
})

app.delete('/task/:id', function (req, res) { // REMOVE task from list
    list = require('./list.json')
    let cTask = list.find(t => t.id == req.params.id)
    list.splice(list.indexOf(cTask), 1)
    fs.writeFileSync('list.json', JSON.stringify(list, null, 4))
    res.send(list)
})

// console.log(__filename);
// console.log(__dirname);
// console.log(process.env.username);
// console.log(process.env.NODE_ENV); // defined in react

app.listen(3800, () => {
    console.log(`server is up`);
})