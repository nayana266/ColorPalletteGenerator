const paletteContainer = document.getElementById('palette');
const favoritesContainer = document.getElementById('favorites');
const generateButton = document.getElementById('generate');
const addColorButton = document.getElementById('addColor');
const colorInput = document.getElementById('colorInput');

// Load favorites from local storage
const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(color => {
        createFavoriteBox(color);
    });
};

// Create a color box for favorites
const createFavoriteBox = (color) => {
    const favoriteBox = document.createElement('div');
    favoriteBox.classList.add('favorite-box');
    favoriteBox.style.backgroundColor = color;
    
    // Remove favorite on click
    favoriteBox.addEventListener('click', () => {
        favoriteBox.remove();
        removeFromFavorites(color);
    });

    favoritesContainer.appendChild(favoriteBox);
};

// Remove color from favorites
const removeFromFavorites = (color) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(fav => fav !== color);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Generate random color
function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Generate palette
function generatePalette() {
    paletteContainer.innerHTML = ''; // Clear previous palette
    const colors = [];

    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        colors.push(color);
        createColorBox(color);
    }
}

// Create a color box
const createColorBox = (color) => {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;

    const colorCode = document.createElement('div');
    colorCode.classList.add('color-code');
    colorCode.textContent = color;
    colorBox.appendChild(colorCode);

    colorBox.addEventListener('click', () => copyToClipboard(color));
    colorBox.addEventListener('dblclick', () => saveToFavorites(color));

    paletteContainer.appendChild(colorBox);
};

// Copy to clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
    });
}

// Save to favorites
function saveToFavorites(color) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(color)) {
        favorites.push(color);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        createFavoriteBox(color);
    } else {
        alert(`${color} is already in your favorites!`);
    }
}

// Add user-defined color
addColorButton.addEventListener('click', () => {
    const color = colorInput.value.trim();
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        createColorBox(color);
        colorInput.value = ''; // Clear input field
    } else {
        alert('Please enter a valid hex color code (e.g., #FF5733)');
    }
});

// Event listeners
generateButton.addEventListener('click', generatePalette);

// Load favorites on initial load
loadFavorites();
generatePalette();
