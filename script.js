let list = localStorage.list? JSON.parse(localStorage.list) : []
printList()


document.querySelector('form').onsubmit = event => {
    event.preventDefault()

    let list = localStorage.list ? JSON.parse(localStorage.list) : []

    const values = Object.values(event.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
    values.checked = false
    values.id = `d${list.length}`
    list.push(values)
    localStorage.list = JSON.stringify(list)

    printList()
    document.querySelector('form').reset()
}

function printList() {
    document.querySelector("#doLi").innerHTML = ""
    document.querySelector("#doneLi").innerHTML = ""
    let list = localStorage.list ? JSON.parse(localStorage.list) : []
    if (list) {
        list.forEach(element => {
            if (!element.checked) {
                document.querySelector("#doLi").innerHTML +=
                    `<li> <label for=""> ${element.task} </label>
            <span>
            <input type="checkbox" onchange="locSto(trans_Li,'${(element.id)}')">
            <button onclick="locSto(removeItem,'${element.id}')">x</button>
            </span>
            </li>`
            } else {
                document.querySelector("#doneLi").innerHTML +=
                    `<li> <label for=""> ${element.task} </label>
            <span>
            <input type="checkbox" checked onchange="locSto(trans_Li,'${element.id}')">
            <button onclick="locSto(removeItem,'${element.id}')">x</button>
            </span>
            </li>`
            }
        });
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // 
function locSto(func, id) {
    list = localStorage.list ? JSON.parse(localStorage.list) : []
    task = list.find(x=>x.id==`${id}`)
    list = func(id, list)
    localStorage.list = JSON.stringify(list)

    printList()
}

function trans_Li(id, list) {
    task = list.find(x=>x.id==`${id}`)
    task.checked = !task.checked
    return list
}

function removeItem(id, list) {
    let element = list.find(x => x.id == id)
    list.splice(list.indexOf(element), 1)
    return list
}
