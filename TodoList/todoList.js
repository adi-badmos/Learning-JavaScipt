const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addTaskButton = document.querySelector('.add-task');
const inputElement = document.querySelector('.input-task');
const divElement = document.querySelector('.all-tasks');
const dateElement = document.querySelector('.date-input');

renderTasks();

addTaskButton.addEventListener('click', addTask);
inputElement.addEventListener('keydown', addTask);
divElement.addEventListener('click', deleteTask);

function renderTasks() {
    let todoListHTML = ``;
    for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const { name, dueDate } = task;
        todoListHTML += `
        <p>
            ${name} ${dueDate}
            <button data-index="${i}" data-kaam="delete">Delete</button>
        </p>
    `;
    } divElement.innerHTML = todoListHTML;
}

function addTask() {
    if(!inputElement.value) {
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const name = inputElement.value;
    const dueDate = dateElement.value || today;

    if(event.key === 'Enter' || event.type === 'click') {
        tasks.push({
            name,
            dueDate
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        inputElement.value = '';
        dateElement.value = '';
        renderTasks();
    }
}

function deleteTask() {
    const targ = event.target;
    if(targ.dataset.kaam === 'delete') {
        const idx = Number(targ.dataset.index);
        tasks.splice(idx, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}