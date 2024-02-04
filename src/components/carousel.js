const fetchImagesFromAPI = async (movieId, apiKey) => {
    try {
        if (!movieId || !apiKey) {
            throw new Error('movieId and apiKey are required.');
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, apiKey);

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`Movie with ID ${movieId} not found.`);
            } else {
                console.error(`Failed to fetch images. Status: ${response.status}`);
            }
            return [];
        }

        const data = await response.json();
        return data.backdrops.map(backdrop => `https://image.tmdb.org/t/p/original${backdrop.file_path}`);
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

const createCarousel = async (movieId, apiKey) => {
    try {
        const carouselContainer = document.getElementById('carousel-container');

        if (!movieId || !apiKey) {
            throw new Error('movieId and apiKey are required.');
        }

        const images = await fetchImagesFromAPI(movieId, apiKey);

        if (images.length === 0) {
            console.error('No images found.');
            return;
        }

        const carouselElement = document.createElement('div');
        carouselElement.id = 'carouselExample';
        carouselElement.className = 'carousel slide';

        const innerCarouselElement = document.createElement('div');
        innerCarouselElement.className = 'carousel-inner';

        images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.className = 'd-block object-fit-cover w-100';
            imgElement.style.height = '100vh';
            imgElement.alt = '';

            carouselItem.appendChild(imgElement);
            innerCarouselElement.appendChild(carouselItem);
        });

        const prevButton = createControlButton('carousel-control-prev', 'Previous', 'carousel-control-prev-icon');
        const nextButton = createControlButton('carousel-control-next', 'Next', 'carousel-control-next-icon');

        carouselElement.appendChild(innerCarouselElement);
        carouselElement.appendChild(prevButton);
        carouselElement.appendChild(nextButton);

        carouselContainer.appendChild(carouselElement);
    } catch (error) {
        console.error(error.message);
    }
};

const createControlButton = (className, ariaLabel, iconClassName) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = 'button';
    button.setAttribute('data-bs-target', '#carouselExample');
    button.setAttribute('data-bs-slide', className.includes('prev') ? 'prev' : 'next');

    const icon = document.createElement('span');
    icon.className = iconClassName;
    icon.setAttribute('aria-hidden', 'true');

    const visuallyHiddenText = document.createElement('span');
    visuallyHiddenText.className = 'visually-hidden';
    visuallyHiddenText.textContent = ariaLabel;

    button.appendChild(icon);
    button.appendChild(visuallyHiddenText);

    return button;
};

export default createCarousel;
