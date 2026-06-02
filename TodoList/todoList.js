const tasks = [];

const addTaskButton = document.querySelector('.add-task');
const inputElement = document.querySelector('.input-task');
const divElement = document.querySelector('.all-tasks');

renderTasks();

addTaskButton.addEventListener('click', () => addTask());
inputElement.addEventListener('keydown', () => addTask(event));

function renderTasks() {
    let todoListHTML = ``;
    for(task of tasks) {
        todoListHTML += `<p>${task}</p>`;
    } divElement.innerHTML = todoListHTML;
}

function addTask(event) {
    if((event && event.key === 'Enter') || !event) {
        tasks.push(inputElement.value);
        inputElement.value = '';
        renderTasks();
    }
}