import '../assets/css/bootstrap.css';
import '../assets/js/bootstrap.bundle.min.js';
import './components/movie-filter.js';
import createCard from './components/card.js';
import createCarousel from './components/carousel';
import axios from 'axios';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNhNTcwMGMwYmY3YzMxNGNlN2YzZGQ3ZGRjY2EyNSIsInN1YiI6IjY1YTFlZDFjMjU4ODIzMDEyZTM3MDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kLBQ4B6eiSZmY3Epx6BRjCkW4XYc8cyEOwgNOAIDFqI'
    }
};

const fetchData = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const movies = response.data.results;
        const container = document.getElementById('card');
        movies.forEach(movie => {
            const card = createCard(movie);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const searchInput = document.getElementById('search');
const moviesContainer = document.getElementById('card');

function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const card = createCard(movie);
        moviesContainer.appendChild(card);
    });
}

function searchMovies(keyword) {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`, options)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error(error);
        });
}

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm.length > 0) {
        searchMovies(searchTerm);
    } else {
        // Jika input kosong, tampilkan film populer
        axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
            .then(response => {
                const movies = response.data.results;
                displayMovies(movies);
            })
            .catch(error => {
                console.error(error);
            });
    }
});

const apiKey = options;
const movieId = 2024;
createCarousel(movieId, apiKey);
fetchData();