// components/movie-filter.js
import axios from 'axios';

class MovieFilter extends HTMLElement {
    constructor() {
        super();
        this.options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNhNTcwMGMwYmY3YzMxNGNlN2YzZGQ3ZGRjY2EyNSIsInN1YiI6IjY1YTFlZDFjMjU4ODIzMDEyZTM3MDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kLBQ4B6eiSZmY3Epx6BRjCkW4XYc8cyEOwgNOAIDFqI'
            }
        };
    }

    connectedCallback() {
        this.render();
        this.fetchGenres();
    }

    async fetchGenres() {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options);
            const genres = response.data.genres;
            console.log(genres);
            this.populateGenres(genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    populateGenres(genres) {
        const selectElement = this.querySelector('#genreFilter');
        genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.text = genre.name;
            selectElement.appendChild(option);
        });
    }

    render() {
        this.innerHTML = `
      <div class="container mt-3">
        <label for="genreFilter">Select Genre:</label>
        <select id="genreFilter" class="form-select">
          <option value="" selected>All Genres</option>
        </select>
      </div>
    `;
    }
}

customElements.define('movie-filter', MovieFilter);
