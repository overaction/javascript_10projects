'use strict';
const APIUSER = `https://api.github.com/users/`;
const APIREPOS = `https://api.github.com/users/bradtraversy/repos`
const info = document.querySelector('.main');
const form = document.getElementById('form');
const search = document.querySelector('.search');

async function getUser(user) {
    const response = await fetch(APIUSER+user);
    const userData = await response.json();
    
    const response2 = await fetch(APIUSER+user+'/repos');
    const reposData = await response2.json();
    console.log(reposData);
    updateUser(userData, reposData);
}

function updateUser(metaData, reposData) {
    info.innerHTML = ``;
    const {avatar_url, name, bio, followers, following} = metaData;
    const infoBox = document.createElement('section');
    infoBox.classList.add('info-box');
    infoBox.innerHTML = `
    <img src="${avatar_url}" alt="">
    <div class="info">
        <h2 class="user">${name}</h2>
        <h3 class="introduce">${bio}</h3>
        <ul class="details">
            <li>${followers} followers</li>
            <li>${following} followings</li>
            <li>${reposData.length} Repos</li>
        </ul>
        <div class="repo">Repos:</div>
        <div class="repos">
            
        </div>
    </div>
    `;
    const repos = infoBox.querySelector('.repos');
    reposData
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,10)
    .forEach((repo) => {
        const button = document.createElement('button');
        button.innerHTML = `
            ${repo.name}
        `;
        repos.appendChild(button);
    })
    info.appendChild(infoBox);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if(user) {
        getUser(user);
        search.value = "";
    }
})