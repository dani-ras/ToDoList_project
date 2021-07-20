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
    // list.push(values)
    // locSto(push, values)
    list.push(values)
    localStorage.list = JSON.stringify(list)

    printList()
    document.querySelector('form').reset()
}

function printList() {
    document.querySelector("#doLi").innerHTML = ""
    document.querySelector("#doneLi").innerHTML = ""
    let list = localStorage.list ? JSON.parse(localStorage.list) : []
    
    // if (list) {
    //     list.forEach(element => {
    //         if (!element.checked) {
    //             document.querySelector("#doLi").innerHTML +=
    //                 `<li> <label for=""> ${element.task} </label>
    //         <span>
    //         <input type="checkbox" onchange="trans_Li('${element.id}')">
    //         <button onclick="removeItem('${element.id}')">x</button>
    //         </span>
    //         </li>`
    //         } else {
    //             document.querySelector("#doneLi").innerHTML +=
    //                 `<li> <label for=""> ${element.task} </label>
    //         <span>
    //         <input type="checkbox" checked onchange="trans_Li('${element.id}')">
    //         <button onclick="removeItem('${element.id}')">x</button>
    //         </span>
    //         </li>`
    //         }
    //     });
    // }
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

// function trans_Li(id) {
//     let element = list.find(x => x.id == id)
//     element.checked = !element.checked
//     printList()
// }

// function removeItem(id) {
//     let element = list.find(x => x.id == id)
//     list.splice(list.indexOf(element), 1)
//     printList()
// }

// // // // // // // // // // // // // // // // // // // // // // // // // // 
function locSto(func, id) {
    // console.log(`${id} sdfsdf`);
    list = localStorage.list ? JSON.parse(localStorage.list) : []
    // console.log(list+"\nlocsto id: "+id)
    task = list.find(x=>x.id==`${id}`)
    // console.log("locsto task:"+task)
    list = func(id, list)
    // console.log(list);
    localStorage.list = JSON.stringify(list)

    printList()
}
// function push(task, list) {
//     list = list.push(task)
//     return list
// }

function trans_Li(id, list) {
    // list = localStorage.list ? JSON.parse(localStorage.list) : []
    task = list.find(x=>x.id==`${id}`)
    task.checked = !task.checked
    return list
}

function removeItem(id, list) {
    let element = list.find(x => x.id == id)
    list.splice(list.indexOf(element), 1)
    return list
}
