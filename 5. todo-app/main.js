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
    <button class="delete hidden"><i class="far fa-window-close"></i></button>
    `;
    todos.appendChild(todo);
    input.value = '';
    todo_number++;

    completeTodo(todo);
    deleteTodo(todo);
}

function completeTodo(todo) {
    const clearBtn = todo.querySelector('.clear');
    const todoData = todo.querySelector('.todo-text');
    clearBtn.addEventListener('click', (e) => {
        todoData.classList.toggle('complete');
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
    });
}