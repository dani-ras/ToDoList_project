doArr = []
doneArr = []

function add_toDo(){
    document.querySelector("#doLi").innerHTML =
    `<li id ="do${doArr.length} >oneItemToDo <input type="checkbox" onchange="trans_doneLi()"> <button>x</button></li>`
}

function trans_doLi(){

}
function trans_doneLi(){
    
}