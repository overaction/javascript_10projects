'use strict';
const input = document.getElementById('input');
const todos = document.getElementById('todos');
const clearAllBtn = document.querySelector('.clear-all');
let todo_number = 1;

function pressEnter() {
    if(event.keyCode === 13 && input.value) {
        addTodo();
    }
}

function addTodo() {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
    <div class="todo-left">
        <button data-index=${todo_number} class="clear"><i class="far fa-circle"></i></button>
        <div data-index=${todo_number} class="todo-text">${input.value}</div>
    </div>
    <button class="delete"><i class="far fa-window-close"></i></button>
    `;
    todos.appendChild(todo);
    input.value = '';
    todo_number++;

    const clearBtn = todo.querySelector('.clear');
    const todoData = todo.querySelector('.todo-text');
    clearBtn.addEventListener('click', (e) => {
        todoData.classList.toggle('complete');
    })
}