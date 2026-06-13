// Movie Data
const moviesData = [
    {
        title: "Aparajito",
        director: "Satyajit Ray",
        poster: "Screenshot 2026-04-15 222307.png",
        link: "https://www.youtube.com/watch?v=scgyxNLiAL8&t=3727s"
    },
    {
        title: "Hirak Rajar Deshe",
        director: "Satyajit Ray",
        poster: "Screenshot 2026-04-15 222120.png",
        link: "https://www.youtube.com/watch?v=5Da8ak63CU4"
    },
    {
        title: "Apur Sansar",
        director: "Satyajit Ray",
        poster: "Screenshot 2026-04-15 222222.png",
        link: "https://www.youtube.com/watch?v=06SpsEz8v-s&t=4695s"
    },
    {
        title: "12th Fail",
        director: "Vidhu Vinod Chopra",
        poster: "Screenshot 2026-04-15 225821.png",
        link: "https://www.youtube.com/watch?v=YuJhPSF7L9c"
    },
    {
        title: "Dipu Number Two",
        director: "Morshedul Islam",
        poster: "Screenshot 2026-04-15 222101.png",
        link: "https://www.youtube.com/watch?v=-zz7T8waQbI"
    },
    {
        title: "3 Idiots",
        director: "Rajkumar Hirani",
        poster: "Screenshot 2026-04-15 225800.png",
        link: "https://www.youtube.com/watch?v=iFkoP8y9648"
    },
    {
        title: "Daruchini Dip",
        director: "Touqir Ahmed",
        poster: "Screenshot 2026-04-15 222652.png",
        link: "https://www.youtube.com/watch?v=EUodA5vxc4I"
    },
    {
        title: "Chutir Ghonta",
        director: "Azizur Rahman",
        poster: "Screenshot 2026-04-15 222458.png",
        link: "https://www.youtube.com/watch?v=WlUtB3a2Kbo"
    },
    {
        title: "Hajar Bochor Dhore",
        director: "Zahir Raihan",
        poster: "Screenshot 2026-04-16 003557.png",
        link: "https://www.youtube.com/watch?v=xVzOSYWf6Nk&t=3994s"
    }
];

// Render all movies initially
function renderMovies(moviesToRender) {
    const moviesGrid = document.getElementById('moviesGrid');
    const noResults = document.getElementById('noResults');

    moviesGrid.innerHTML = '';

    if (moviesToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    moviesToRender.forEach((movie, index) => {
        const movieItem = document.createElement('a');
        movieItem.href = movie.link;
        movieItem.target = '_blank';
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <div class="poster-container">
                <img src="${movie.poster}" alt="${movie.title} Poster" class="poster">
                <div class="play-overlay">
                    <span class="play-icon">▶</span>
                    <p class="watch-text">Watch Now</p>
                </div>
            </div>
            <div class="movie-info">
                <p class="movie-title">${movie.title}</p>
                <p class="director-name">${movie.director}</p>
            </div>
        `;
        moviesGrid.appendChild(movieItem);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            renderMovies(moviesData);
            return;
        }

        const filtered = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(query) ||
            movie.director.toLowerCase().includes(query)
        );

        renderMovies(filtered);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderMovies(moviesData);
    initSearch();
});
