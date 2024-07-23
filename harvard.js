// const API_KEY = 'eabd79d5-699b-45ca-ab08-8def26cbdf99';
// const API_URL = 'https://api.harvardartmuseums.org/object';
// const GALLERY_URL = 'https://api.harvardartmuseums.org/gallery?floor=2';
// const searchInput = document.getElementById('search-input');
// const suggestionContainer = document.getElementById('suggestions');
// const resultsContainer = document.getElementById('results');
// // Function to fetch and display gallery
// async function displayGallery() {
//     try {
//         const response = await fetch(GALLERY_URL);
//         const data = await response.json();
//         const galleryContainer = document.createElement('div');
//         galleryContainer.innerHTML = '<h2>Galleries</h2>';
//         data.records.forEach(gallery => {
//             const galleryLink = document.createElement('a');
//             galleryLink.href = gallery.url;
//             galleryLink.textContent = gallery.name || 'Unknown Gallery';
//             galleryLink.target = '_blank';
//             galleryContainer.appendChild(galleryLink);
//             galleryContainer.appendChild(document.createElement('br'));
//         });
//         resultsContainer.appendChild(galleryContainer);
//     } catch (error) {
//         console.error('Error fetching gallery data:', error);
//     }
// }
// Function to fetch and display search results

// async function searchArtworks() {
//     const query = searchInput.value;
//     if (query === '') {
//         resultsContainer.innerHTML = '';
//         return;
//     }
//     const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayArtworks(data.records);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//     suggestionContainer.innerHTML = '';
// }
// // Function to display suggestions based on user input

// async function displaySuggestions() {
//     const query = searchInput.value;
//     if (query === '') {
//         suggestionContainer.innerHTML = '';
//         return;
//     }
//     const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displaySuggestions(data.records);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
// Event listener for input to display suggestions

// searchInput.addEventListener('input', displaySuggestions);
// // Function to display artworks
// function displayArtworks(artworks) {
//     resultsContainer.innerHTML = '';
//     artworks.forEach(artwork => {
//         const artworkElement = document.createElement('div');
//         artworkElement.className = 'artwork-wrapper'; // Add a class for the wrapper div
//         const imgDiv = document.createElement('div');
//         imgDiv.className = 'artwork';
//         const title = artwork.title || 'Unknown Title';
//         const artist = artwork.people ? artwork.people.map(person => person.name).join(', ') : 'Unknown Artist';
//         const date = artwork.dated || 'Unknown Date';
//         const medium = artwork.medium || 'Unknown Medium';
//         const imageUrl = artwork.primaryimageurl || '';
//         imgDiv.innerHTML = `
//             ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
//             <h3>${title}</h3>
//             <p><strong>Artist:</strong> ${artist}</p>
//             <p><strong>Date:</strong> ${date}</p>
//             <p><strong>Medium:</strong> ${medium}</p>
//         `;
//         artworkElement.appendChild(imgDiv);
//         resultsContainer.appendChild(artworkElement);
//     });
// }
// displayGallery();
// searchArtworks();




const API_KEY = 'eabd79d5-699b-45ca-ab08-8def26cbdf99';
const API_URL = 'https://api.harvardartmuseums.org/object';
const DEFAULT_IMAGE_COUNT = 15;
const searchInput = document.getElementById('search-input');
const suggestionContainer = document.getElementById('suggestions');
const resultsContainer = document.getElementById('results');
// Function to fetch and display default artwork images
async function displayDefaultArtworkImages() {
    try {
        const url = `${API_URL}?apikey=${API_KEY}&size=${DEFAULT_IMAGE_COUNT}`;
        const response = await fetch(url);
        const data = await response.json();
        displayArtworks(data.records, 'default-artwork'); 
    } catch (error) {
        console.error('Error fetching default artwork images:', error);
    }
}
// Function to display artwork images
function displayArtworks(artworks, className) {
    resultsContainer.innerHTML = '';
    artworks.forEach(artwork => {
        const artworkElement = document.createElement('div');
        artworkElement.className = 'artwork-wrapper'; 
        const imgDiv = document.createElement('div');
        imgDiv.className = 'artwork ' + className; 
        const title = artwork.title || 'Unknown Title';
        const artist = artwork.people ? artwork.people.map(person => person.name).join(', ') : 'Unknown Artist';
        const date = artwork.dated || 'Unknown Date';
        const medium = artwork.medium || 'Unknown Medium';
        const imageUrl = artwork.primaryimageurl || '';
        imgDiv.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
            <h3>${title}</h3>
            <p><strong>Artist:</strong> ${artist}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Medium:</strong> ${medium}</p>
        `;
        artworkElement.appendChild(imgDiv);
        resultsContainer.appendChild(artworkElement);
    });
}
// Function to fetch suggestions based on user input
async function fetchSuggestions(query) {
    try {
        const url = `${API_URL}?apikey=${API_KEY}&q=${query}&size=8`; 
        const response = await fetch(url);
        const data = await response.json();
        return data.records.map(record => record.title);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}
// Function to display suggestions
async function displaySuggestions() {
    const query = searchInput.value.trim();
    if (query === '') {
        suggestionContainer.innerHTML = '';
        displayDefaultArtworkImages(); 
        return;
    }
    const suggestions = await fetchSuggestions(query);
    suggestionContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = suggestion;
        suggestionElement.className = 'suggestion';
        suggestionElement.addEventListener('click', () => {
            searchInput.value = suggestion;
            suggestionContainer.innerHTML = ''; 
            searchArtworks(); 
        });
        suggestionContainer.appendChild(suggestionElement);
    });
}
// Function to fetch and display search results
async function searchArtworks() {
    const query = searchInput.value.trim();
    if (query === '') {
        displayDefaultArtworkImages(); 
        return;
    }
    try {
        const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        displayArtworks(data.records, 'search-result');
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    suggestionContainer.innerHTML = '';
}

searchInput.addEventListener('input', displaySuggestions);

displayDefaultArtworkImages(); 