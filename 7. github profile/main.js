'use strict';
const APIUSER = `https://api.github.com/users/`;

async function getUser(user) {
    const response = await fetch(APIUSER+user);
    const users = await response.json();

    
}

async function fetchUser(user) {
    const fetched = await getUser(user);
    console.log(fetched);
}

fetchUser(`overaction`);