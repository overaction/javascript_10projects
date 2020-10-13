'use strict';
const input = document.getElementById('input');
const todos = document.getElementById('todos');
const clearAllBtn = document.querySelector('.clear-all');

const localTodos = localStorage.getItem('todos');
const parsedTodos = JSON.parse(localTodos);

parsedTodos.forEach((todoData) => {
    addLSTodo(todoData);
})

function pressEnter() {
    if(event.keyCode === 13 && input.value) {
        addTodo();
    }
}

function addLSTodo(metadata) {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
    <div class="todo-left">
        <button class="clear"><i class="far fa-circle"></i></button>
        <div class="todo-text ${metadata.complete ? 'complete' : ''}">${metadata.text}</div>
    </div>
    <button class="delete hidden"><i class="far fa-window-close"></i></button>
    `;
    todos.appendChild(todo);

    completeTodo(todo);
    deleteTodo(todo);
}

function addTodo() {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
    <div class="todo-left">
        <button class="clear"><i class="far fa-circle"></i></button>
        <div class="todo-text">${input.value}</div>
    </div>
    <button class="delete hidden"><i class="far fa-window-close"></i></button>
    `;
    todos.appendChild(todo);
    input.value = '';

    completeTodo(todo);
    deleteTodo(todo);
    updateLS();
}

function completeTodo(todo) {
    const clearBtn = todo.querySelector('.clear');
    const todoData = todo.querySelector('.todo-text');
    clearBtn.addEventListener('click', (e) => {
        todoData.classList.toggle('complete');
        updateLS();
    })
}

function deleteTodo(todo) {
    const deleteBtn = todo.querySelector('.delete');
    todo.addEventListener('mouseover', (e) => {
        deleteBtn.classList.remove('hidden');
    });
    todo.addEventListener('mouseleave', () => {
        deleteBtn.classList.add('hidden');
    })
    deleteBtn.addEventListener('click', (e) => {
        const targetTodo = deleteBtn.parentNode;
        targetTodo.remove();
        updateLS();
    });
}

function checkComplete() {
    let isComplete = false;
    const currentTodos = todos.querySelectorAll('.todo');
    currentTodos.forEach((todo) => {
        if(!todo.querySelector('.todo-text').classList.contains('complete'))
            isComplete = true;
    })
    return isComplete;
}

function completeAllTodos() {
    clearAllBtn.addEventListener('click', () => {
        let complete = checkComplete();
        const currentTodos = todos.querySelectorAll('.todo');
        currentTodos.forEach((todo) => {
            const todoText = todo.querySelector('.todo-text');
            if(complete) todoText.classList.add('complete');
            else todoText.classList.remove('complete')
        })
        updateLS();
    })
}

function updateLS() {
    const todosLS = document.querySelectorAll('.todo-text');
    const array_todos = [];
    todosLS.forEach((todo) => {
        array_todos.push({text: todo.innerHTML, complete: todo.classList.contains('complete')})
    })
    localStorage.setItem('todos', JSON.stringify(array_todos));
    console.log('updated!!');
}

completeAllTodos();