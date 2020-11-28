
// grabbing dom element by its respective ID
let button = document.getElementById('button');
let inputToDo = document.getElementById('inputToDoo');
let lists = document.getElementById('lists');
let feedback = document.getElementById('feedback');
let removeAll = document.getElementById('removeAll');

//Grabing all the icons with given class
let trash = document.querySelectorAll('.trash');
let edit = document.querySelectorAll('.edit');
let check = document.querySelectorAll('.check');

//Initializing variables
let tasks = [];
let html;
let localToDo;

// execute function on enter key press
inputToDo.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        button.click();
    }
})

// selecting or putting cursor inside input 
document.getElementById(inputToDoo.id).select()

//Adding event listner on clicki in Add button
button.addEventListener('click', add);

//Function to run while button clicked
function add() {
    // setting time out function to trigger the display = 'block' of feedback if input value is empty
    if (inputToDo.value.trim()  == '') {
        setTimeout(() => {
            feedback.style.display = 'block';
        }, 100);
    //else run this if input box has value
    } else {
        //pushing input value to tasks array
        tasks.push(inputToDo.value);
        //setting localstorage by coverting tasks into string
        localStorage.setItem('toDo', JSON.stringify(tasks));
        //reload
        location.reload();
    }

    //setting timeout to trigger the display to none of feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
        location.reload();
    }, 3000);
    inputToDo.value = '';
    //running functions as callback
    populate()
    get();
}

//running function on window koading
window.onload = get();


//get function to get the items in local storage
function get() {
    //if localstorage is empty
    if (JSON.parse(localStorage.getItem('toDo') === null || localStorage.getItem('toDo')).length <= 0 || localStorage.length == 0) {
        lists.innerHTML = `<h1> Nothing to Show Please add items </h1>`
        console.log('delete')
        //setting all the localstorage item  into tasks array by parsing them
    } else {
        //pasing localstorage items
        localToDo = JSON.parse(localStorage.getItem('toDo'));
        //setting task as empty before adding all the localstorage items into tasks array
        tasks = [];
        //forEach loop in localstorage items to push each element in tasks array one by one
        localToDo.forEach(element => {
            tasks.push(element);
        });
        // setting html into empty before populating the dom to avoid duplicate task
        html = '';
        //running populate to populate dom after setting localstorage items into tasks array
        populate();
    }
}


function populate() {
    //running forEach loop to loop through the tasks array and add it to 'html' variable
    tasks.forEach((element, index) => {
        html += `   <div class="item" id="item${index}">
                        <h1 class="itemName">${element}</h1>
                        <i><img src="img/check.svg" class="icon check" id="check" alt=""></i>
                        <i><img src="img/editsvg.svg" class="icon edit" id="edit" alt=""></i>
                        <i><img src="img/trash.svg" class="icon trash" id="trash" alt=""></i>
                    </div>`;
    });
    //setting lists innerhtml equal to html variable
    lists.innerHTML = html;
}

//sellecting the .trash class and running forEach to add event listner on each item
lists.querySelectorAll('.trash').forEach(element => {
    element.addEventListener('click', () => {
        //reloading the site to avoid indexing bugs
        location.reload()
        //selecting clicked elements top parent element close to div and its first child which id heading and its next sibilings as h1 tag and finally its innerText
        let toDelete = element.parentElement.closest('div').firstChild.nextSibling.innerText;
        //running forEach loop in tasks array to find items equal to the toDelete variable
        tasks.forEach((_element, index) => {
            //if task[index] is equal to toDelete variable
            if (tasks[index] === toDelete) {
                //cutting the items of task array from currentIndex to 1 element
                tasks.splice(index, 1)
                //Again setting localstorage as tasks array by parsing them
                localStorage.setItem('toDo', JSON.stringify(tasks))
                // setting tasks array to empty
                tasks = [];
            }
            //running get function to push each localstorage items to tasks array after clearing the array
            get();
        })
    })
})


//removing all the localstorage and dom elements on 'Clear items' button click
removeAll.addEventListener('click', () => {
    //confirming user if they really wanna delete all the items added by them at once
    if (window.confirm('Are you sure you wanna delete all the items') == true) {
        //clearing localstorage
        localStorage.clear();
        // setting tasks array to empty
        tasks = [];
        //Running get function to check for localstorage and updating dom
        location.reload();
        get();
    }
})