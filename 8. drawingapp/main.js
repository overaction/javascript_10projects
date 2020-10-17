'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = document.getElementById('size');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const color = document.getElementById('color');
const clearBtn = document.getElementById('clear');

let x = 50;
let y = 50;
let click = false;

canvas.addEventListener('mousedown',(e) => {
    click = true;
})

canvas.addEventListener('mouseup', (e) => {
    click = false;
})

canvas.addEventListener('mousemove', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    if(click)
        drawCircle(x,y);
});

increaseBtn.addEventListener('click', () => {
    size.innerText = Number(size.innerText)+5;
});


decreaseBtn.addEventListener('click', () => {
    size.innerText = Number(size.innerText)-5;
})

function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x,y,size.innerText,0,Math.PI*2);
    ctx.fillStyle = color.value;
    ctx.fill();
}

