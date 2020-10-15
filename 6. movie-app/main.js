const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=9fb7a0bacca5550e66bf3fba29f5ba46&language=ko&page=1®ion=KR`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=9fb7a0bacca5550e66bf3fba29f5ba46&query=`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const movieList = document.querySelector('.movie-list');

const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search_btn');

async function fetchMovies() {
    const response = await fetch(API_URL);
    const movies = await response.json();

    return movies;
}

async function fetchSearchMovies(name) {
    const url = SEARCH_URL+name;
    console.log(url);
    const response = await fetch(url);
    const movies = await response.json();

    return movies;
}

async function fetchedData() {
    const fetched = await fetchMovies();
    updateMovie(fetched.results);
    console.log(fetched.results);
}

async function searchMovie(name) {
    const fetched = await fetchSearchMovies(name);
    updateMovie(fetched.results);
}

function getClassByRate(average) {
    if(average >= 8) return 'green'
    else if(average >= 5) return 'orange'
    else return 'red'
}

function updateMovie(metaData) {
    movieList.innerHTML = ``;
    metaData.forEach((movie) => {
        const {title,vote_average,poster_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH}${poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        `;
        movieList.appendChild(movieEl);
    })
}

fetchedData();

searchBtn.addEventListener('click', () => {
    const movieName = input.value;
    if(movieName)
        searchMovie(movieName);
})