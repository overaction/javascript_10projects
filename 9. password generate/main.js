'use strict';
const password = document.querySelector('.password');

const length = document.querySelector('.length');
const uppercase = document.querySelector('.uppercase');
const lowercase = document.querySelector('.lowercase');
const number = document.querySelector('.number');
const symbol = document.querySelector('.symbol');

const createBtn = document.querySelector('.create');

let result = ``;
let charlength;
let characterU = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
let characterL = `abcdefghijklmnopqrstuvwxyz`;
let symbols = "!@#$%^&*()_+=";
let numbers = `0123456789`;

function getUppercase() {
    return characterU[Math.floor(Math.random() * characterU.length)];
}

function getLowercase() {
    return characterL[Math.floor(Math.random() * characterL.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePW() {
    console.log(length.value);
    if (uppercase.checked) {
        result += getUppercase();
    }

    if (lowercase.checked) {
        result += getLowercase();
    }

    if (number.checked) {
        result += getNumber();
    }

    if (symbol.checked) {
        result += getSymbol();
    }
    for(let i=result.length; i<length.value; i++) {
        const ext = extraPW();
        result += ext;
    }
    password.innerText = result;
    result = ``;
}

function extraPW() {
    const expw = [];
    if (uppercase.checked) {
        expw.push(getUppercase());
    }

    if (lowercase.checked) {
        expw.push(getLowercase());
    }

    if (number.checked) {
        expw.push(getNumber());
    }

    if (symbol.checked) {
        expw.push(getSymbol());
    }
    if(expw.length === 0) return '';

    return expw[Math.floor(Math.random()*expw.length)];
}

createBtn.addEventListener('click',generatePW);
