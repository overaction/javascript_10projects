'use strict';
const password = document.querySelector('.password');

const length = document.querySelector('.length');
const uppercase = document.querySelector('.uppercase');
const lowercase = document.querySelector('.lowercase');
const number = document.querySelector('.number');
const symbol = document.querySelector('.symbol');

const createBtn = document.querySelector('.create');

let result = ``;
let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
let numbers = `0123456789`;

function generatePW(char, length, up, low, num) {
    const charlength = char.length;
    createBtn.addEventListener('click',(e) => {
        for ( let i = 0; i < length; i++ ) {
            result += char.charAt(Math.floor(Math.random() * charlength));
        }
        password.innerText = result;
        result = ``;
    })
}

generatePW(characters,length.value);
