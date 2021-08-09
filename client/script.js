printList()

document.querySelector('form').onsubmit = event => {
    event.preventDefault()

    const values = Object.values(event.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )

    if ((values.task.trim())) {
        addTask(values)
        printList()
    }
    document.querySelector('form').reset()
}

async function printList() {
    document.querySelector("#doLi").innerHTML = ""
    document.querySelector("#doneLi").innerHTML = ""


    const res = await axios.get('http://localhost:3800/task')
    const list = res.data

    if (list) {
        list.forEach(element => {
            if (!element.checked) {
                document.querySelector("#doLi").innerHTML +=
                    `<li> <label for=""> ${element.task} </label>
                <span>
                <input type="checkbox" onchange="trans_Li('${(element.id)}')">
                <button onclick="removeItem('${element.id}')">x</button>
            </span>
            </li>`
            } else {
                document.querySelector("#doneLi").innerHTML +=
                    `<li> <label for=""> ${element.task} </label>
            <span>
            <input type="checkbox" checked onchange="trans_Li('${element.id}')">
            <button onclick="removeItem('${element.id}')">x</button>
            </span>
            </li>`
            }
        });
    }

}

// // // // // // // // // // // // // // // // // // // // // // // // // // 

async function addTask(task) {
    const res = await axios.post('http://localhost:3800/task', task)
    return res
}

async function trans_Li(id) {
    await axios.put('http://localhost:3800/task', { "id": id })
    printList()
}

function removeItem(id) {
    axios.delete(`http://localhost:3800/task/${id}`)
        .then(() => {
            printList()
        }
        )
}
