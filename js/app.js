let button = document.getElementById('button');
let inputToDo = document.getElementById('inputToDo');
let lists = document.getElementById('lists');
let feedback = document.getElementById('feedback');
let removeAll = document.getElementById('removeAll');

let trash = document.querySelectorAll('.trash');
let edit = document.querySelectorAll('.edit');
let check = document.querySelectorAll('.check');

let tasks = [];
let html;
let localToDo;


button.addEventListener('click', add);

function add() {
    if (inputToDo.value == '') {
        setTimeout(() => {
            feedback.style.display = 'block';
        }, 100);

    } else {
        tasks.push(inputToDo.value);
        localStorage.setItem('toDo', JSON.stringify(tasks));
        location.reload();
    }
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
    inputToDo.value = '';
    populate()
    get();
}

window.onload = get();

function get() {
    if (JSON.parse(localStorage.getItem('toDo')).length <= 0 ) {
        lists.innerHTML = `<h1> Nothing to Show Please add items </h1>`
    } else {
        localToDo = JSON.parse(localStorage.getItem('toDo'));
        tasks = [];
        localToDo.forEach(element => {
            tasks.push(element);
        });
        html = '';
        populate();
    }
}


function populate() {
    tasks.forEach((element, index) => {
        html += `   <div class="item" id="item${index}">
                        <h1 class="itemName">${element}</h1>
                        <i><img src="img/check.svg" class="icon check" id="check" alt=""></i>
                        <i><img src="img/editsvg.svg" class="icon edit" id="edit" alt=""></i>
                        <i><img src="img/trash.svg" class="icon trash" id="trash" alt=""></i>
                    </div>`;
    });

    lists.innerHTML = html;
}

lists.querySelectorAll('.trash').forEach(element => {
    element.addEventListener('click',() => {
        location.reload()
        let toDelete = element.parentElement.closest('div').firstChild.nextSibling.innerText;
        tasks.forEach((_element, index) => {
            if(tasks[index] === toDelete){
                tasks.splice(index, 1)
                console.log(tasks);
                localStorage.setItem('toDo', JSON.stringify(tasks))
                tasks = [];
            }
            get();
        })
    })
})

removeAll.addEventListener('click', () => {
    if(window.confirm('Are you sure you wanna delete all the items') == true){
        localStorage.removeItem('toDo');
        tasks = [];
        get()
    }
})