const list = []
printList()

document.querySelector('form').onsubmit = event => {
    event.preventDefault()
    const values = Object.values(event.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
    values.checked = false
    values.id = `d${list.length}`
    list.push(values)

    printList()
    document.querySelector('form').reset()
}

function printList() {
    document.querySelector("#doLi").innerHTML = ""
    document.querySelector("#doneLi").innerHTML = ""

    list.forEach(element => {
        if (!element.checked) {
            document.querySelector("#doLi").innerHTML +=
                `<li> <label for=""> ${element.task} </label>
            <span>
                <input type="checkbox" onchange="trans_Li('${element.id}')">
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

function trans_Li(id) {
    let element = list.find(x => x.id == id)
    element.checked = element.checked ? false : true
    printList()
}

function removeItem(id) {
    let element = list.find(x => x.id == id)
    list.splice(list.indexOf(element), 1)
    printList()
}