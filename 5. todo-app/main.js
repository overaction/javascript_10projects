'use strict';
const input = document.getElementById('input');
const todos = document.getElementById('todos');

function pressEnter() {
    if(event.keyCode === 13) {
        addTodo();
    }
}

function addTodo() {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
    <div class="todo-left">
        <button class="clear"><i class="far fa-circle"></i></button>
        <div class="todo-text">${input.value}</div>
    </div>
    <button class="delete"><i class="far fa-window-close"></i></button>
    `;
    todos.appendChild(todo);
    input.value = '';
}