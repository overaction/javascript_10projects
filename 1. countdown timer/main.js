'use strict';
const newYears = `2021-01-01`;
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    const diffseconds = (newYearsDate - currentDate)/1000;

    const d = Math.floor(diffseconds / (3600*24));
    const h = Math.floor(diffseconds % (3600*24) / 36000);
    const m = Math.floor(diffseconds % 3600 / 60);
    const s = Math.floor(diffseconds % 60);

    days.textContent = d;
    hours.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;
}

setInterval(() => {countdown()},1000);