async function getMovies() {
    const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

    return fetchData(URL);
}

async function getMoviesSearch(searchItem) {
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${searchItem}`;

    return fetchData(SEARCHAPI);
}

async function fetchData(url) {
    const response = await fetch(url);
    const movies = await response.json();

    return movies.results;
}

function getRatingClass(rating) {
    if (rating >= 7) {
        return 'ratingGreen';
    } else if (rating < 7 && rating > 5) {
        return 'ratingOrange';
    }

    return 'ratingRed';
}

async function displayMovies(movies = []) {
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const moviesElement = document.getElementById('movies');

    moviesElement.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const imgElement = document.createElement('img');
        imgElement.src = `${IMGPATH}/${movie.poster_path}`;

        const movieInfoElement = document.createElement('div');
        movieInfoElement.classList.add('movie-info');

        const h3Element = document.createElement('h3');
        h3Element.innerText = `${movie.title}`;
        
        const spanElement = document.createElement('span');
        spanElement.classList.add(`${getRatingClass(movie.vote_average)}`);
        spanElement.innerText = `${movie.vote_average}`;

        movieInfoElement.appendChild(h3Element);
        movieInfoElement.appendChild(spanElement);

        movieElement.appendChild(imgElement);
        movieElement.appendChild(movieInfoElement);

        moviesElement.appendChild(movieElement);
    });

}

async function handleSearchInput(e) {
    e.preventDefault();
    
    const searchInput = document.getElementById('searchInput');
    const searchItem = searchInput.value;

    if (searchItem.length > 0) {
        const movies = await getMoviesSearch(searchItem);
        displayMovies(movies);
    }
}

// For debug purpose
getMovies().then((movies) => console.log('movies: ', movies));

const searchInput = document.getElementsByTagName('form')[0];
searchInput.addEventListener('submit', handleSearchInput);

getMovies().then((movies) => displayMovies(movies));