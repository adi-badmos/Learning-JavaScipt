const tasks = [];

const addTaskButton = document.querySelector('.add-task');
const inputElement = document.querySelector('.input-task');
const divElement = document.querySelector('.all-tasks');

renderTasks();

addTaskButton.addEventListener('click', addTask);
inputElement.addEventListener('keydown', addTask);
divElement.addEventListener('click', deleteTask);

function renderTasks() {
    let todoListHTML = ``;
    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        todoListHTML += `
        <p>
            ${task}
            <button data-index="${i}" data-kaam="delete">Delete</button>
        </p>
    `;
    } divElement.innerHTML = todoListHTML;
}

function addTask() {
    if(!inputElement.value) {
        return;
    }

    console.log(event);

    if(event.key === 'Enter' || event.type === 'click') {
        tasks.push(inputElement.value);
        inputElement.value = '';
        renderTasks();
    }
}

function deleteTask() {
    const targ = event.target;
    if(targ.dataset.kaam === 'delete') {
        const idx = Number(targ.dataset.index);
        tasks.splice(idx, 1);
        renderTasks();
    }
}