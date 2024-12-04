// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Event listener for adding new tasks
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    updateLocalStorage();
    renderTasks();
    taskInput.value = '';
});

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id})">
            <span>${task.text}</span>
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    updateLocalStorage();
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit your task:', task.text);

    if (newTaskText && newTaskText.trim() !== '') {
        task.text = newTaskText.trim();
        updateLocalStorage();
        renderTasks();
    } else {
        alert('Task cannot be empty!');
    }
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
