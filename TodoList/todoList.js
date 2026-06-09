const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addTaskButton = document.querySelector('.add-task');
const inputElement = document.querySelector('.input-task');
const divElement = document.querySelector('.all-tasks');

renderTasks();

addTaskButton.addEventListener('click', addTask);
inputElement.addEventListener('keydown', addTask);
divElement.addEventListener('click', deleteTask);

function renderTasks() {
    let todoListHTML = ``;

    tasks.forEach((task, idx) => {
        todoListHTML += `
            <div class="task-row">
                <div>${task}</div>
                <button class="delete-task">
                    Delete
                </button>
            </div>
        `;
    });
    
    divElement.innerHTML = todoListHTML;
}

function addTask() {
    if(!inputElement.value) {
        return;
    }

    const name = inputElement.value;
    if(event.key === 'Enter' || event.type === 'click') {
        tasks.push(name);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        inputElement.value = '';
        renderTasks();
    }
}

function deleteTask() {
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
    });
}