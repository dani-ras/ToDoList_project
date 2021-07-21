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
        axios.post('http:localhost:3000/task', values)
            .then(res => {
                printList()
            })
    }
    document.querySelector('form').reset()
}

function printList() {
    document.querySelector("#doLi").innerHTML = ""
    document.querySelector("#doneLi").innerHTML = ""


    axios.get('http:localhost:3000/task')
        .then(res => {
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
        })

}

// // // // // // // // // // // // // // // // // // // // // // // // // // 

function trans_Li(id) {
    axios.put('http:localhost:3000/task', { "id": id })
        .then(res => {
            printList()
        }
        )
}

function removeItem(id) {
    axios.delete(`http:localhost:3000/task/${id}`)
        .then(res => {
            printList()
        }
        )
}
