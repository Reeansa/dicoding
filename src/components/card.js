const createCard = (movie) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.width = '18rem';

    const imgElement = document.createElement('img');
    imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    imgElement.style.height = '400px';
    imgElement.className = 'card-img-top';

    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';

    const titleElement = createElement('h5', 'card-title', movie.title);
    const textElement = createElement('p', 'card-text', movie.overview);
    textElement.style.overflow = 'hidden';
    textElement.style.whiteSpace = 'nowrap';
    textElement.style.textOverflow = 'ellipsis';

    const detailButton = createElement('button', 'btn btn-primary', 'View Details');
    detailButton.type = 'button';

    appendChildren(cardBodyElement, [titleElement, textElement, detailButton]);
    appendChildren(cardElement, [imgElement, cardBodyElement]);

    return cardElement;
};

const createElement = (tag, className, textContent) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = textContent;
    return element;
};

const appendChildren = (parent, children) => {
    children.forEach(child => parent.appendChild(child));
};

export default createCard;
